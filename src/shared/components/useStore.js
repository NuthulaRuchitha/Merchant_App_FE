import { useContext } from "react";
import { StoreContext } from "./StoreContext";

export const useStore = () => {
  return useContext(StoreContext);
};