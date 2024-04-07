import { createContext, useEffect } from "react";
import { StoreApi } from "zustand";
import store from "../state/store";
import { RootState } from "../state/types";
import runStoreEffects from "../state/effects";

const storeContext = createContext({} as StoreApi<RootState>);

const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    return runStoreEffects(store);
  }, []);

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

const StoreContextConsumer = storeContext.Consumer;
export { storeContext, StoreContextProvider, StoreContextConsumer };
export default storeContext;
