import { createContext } from "react";
import DBClient from "../db/DBClient";
import IDBClient from "../db/IDBClient";

const dbContext = createContext({} as IDBClient);

const DBContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <dbContext.Provider value={DBClient}>{children}</dbContext.Provider>;
};
const DBContextConsumer = dbContext.Consumer;

export { DBContextProvider, DBContextConsumer };
export default dbContext;
