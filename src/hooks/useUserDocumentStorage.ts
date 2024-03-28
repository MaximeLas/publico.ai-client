import {
  ref,
  uploadBytes,
  UploadMetadata,
  uploadBytesResumable,
} from "firebase/storage";
import useAuth from "../auth/useAuth";
import { storage } from "../firebase";

export default function useUserDocumentStorage() {
  const { user } = useAuth() || {};
  const assertNoUser = () => {
    if (!user) {
      throw new Error("User not logged in");
    }
  };

  const uploadUserDocument = async (
    file: File,
    filename: string,
    metadata?: UploadMetadata
  ) => {
    assertNoUser();
    // TODO: add some extra validation to file name and file type
    const storageRef = ref(storage, `chat_documents/${user}/${filename}`);
    await uploadBytes(storageRef, file, metadata);
  };

  const startUploadUserDocumentTask = (
    file: File,
    filename: string,
    metadata?: UploadMetadata
  ) => {
    assertNoUser();
    // TODO: add some extra validation to file name and file type
    const storageRef = ref(storage, `chat_documents/${user}/${filename}`);
    return uploadBytesResumable(storageRef, file, metadata);
  };

  return { uploadUserDocument, startUploadUserDocumentTask };
}
