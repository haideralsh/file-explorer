import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type SelectedNode = {
  id: string;
  name: string;
  type: "file" | "directory";
};

type SelectedContextValue = {
  selected: SelectedNode | null;
  setSelected: Dispatch<SetStateAction<SelectedNode | null>> | Function;
};

export const SelectedContext = createContext<SelectedContextValue>({
  selected: null,
  setSelected: () => {},
});

export const useSelectedContext = () => useContext(SelectedContext);
