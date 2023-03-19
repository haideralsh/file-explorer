import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type SelectedNode = {
  name: string;
  type: "file" | "directory";
};

type SelectedContextValue = {
  setSelected: Dispatch<SetStateAction<SelectedNode | null>> | Function;
};

export const SelectedContext = createContext<SelectedContextValue>({
  setSelected: () => {},
});

export const useSelectedContext = () => useContext(SelectedContext);
