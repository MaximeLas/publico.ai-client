import { useContext } from "react";
import storeContext from "../context/Store";

export default function useStoreApi() {
  return useContext(storeContext);
}
