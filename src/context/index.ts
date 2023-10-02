import { useContext } from "react";
import { GlobalStoreContext } from "./GlobalStore";

export const useGlobalStore = () => useContext(GlobalStoreContext);
