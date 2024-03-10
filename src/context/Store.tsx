import { createContext } from "react";
import { StoreApi } from "zustand";
import store from "../state/store";
import { RootState } from "../state/types";

const storeContext = createContext({} as StoreApi<RootState>);

const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

const StoreContextConsumer = storeContext.Consumer;
export { storeContext, StoreContextProvider, StoreContextConsumer }
export default storeContext;
