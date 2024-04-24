import {
  ref,
  uploadBytes,
  UploadMetadata,
  uploadBytesResumable,
} from "firebase/storage";
import useAuth from "./state/useAuth";
import { storage } from "../firebase";

export default function useUserDocumentStorage() {
  const { user } = useAuth() || {};
  const getUserId = () => {
    if (!user?.uid) {
      throw new Error("User not logged in");
    }
    return user.uid;
  };

  const uploadUserDocument = async (
    file: File,
    filename: string,
    metadata?: UploadMetadata
  ) => {
    getUserId();
    // TODO: add some extra validation to file name and file type
    const uid = getUserId();
    const storageRef = ref(storage, `chat_documents/${uid}/${filename}`);
    await uploadBytes(storageRef, file, metadata);
  };

  const startUploadUserDocumentTask = (
    file: File,
    filename: string,
    metadata?: UploadMetadata
  ) => {
    getUserId();
    // TODO: add some extra validation to file name and file type
    const uid = getUserId();
    const storageRef = ref(storage, `chat_documents/${uid}/${filename}`);
    return uploadBytesResumable(storageRef, file, metadata);
  };

  return { uploadUserDocument, startUploadUserDocumentTask };
}
