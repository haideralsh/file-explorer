import { useState } from "react";
import {
  FileTree as FileTreeType,
  fileTreeMachine,
  find,
} from "../models/fileTree";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import FileTree from "./FileTree";
import { useMachine } from "@xstate/react";
import SearchInput from "./SearchInput";
import { SelectedContext, SelectedNode } from "./SelectedContext";

const classes = {
  container: css`
    display: flex;
    flex-direction: column;
    max-width: 288px;
    gap: 5px;
    padding: 20px;
    border-right: 1px solid;
    border-color: rgba(220, 220, 230, 0.75);
  `,
};

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  gap: 2px;
  padding: 2px 4px;
  border-radius: 4px;

  font-size: 11px;
  background-color: #ffffff;

  &:hover {
    background-color: rgba(220, 220, 230, 0.75);
  }
`;

type FileTreeContainerProps = {
  fileTree: FileTreeType;
};

export const FileTreeContainer: React.FC<FileTreeContainerProps> = ({
  fileTree,
}) => {
  const [filteredFileTree, setFilteredFileTree] = useState(fileTree);
  const [state, send] = useMachine(fileTreeMachine);
  const [selected, setSelected] = useState<SelectedNode | null>(null);

  function handleSearch(query: string) {
    setFilteredFileTree(find(fileTree, query));
    send("SEARCH");
  }

  if (fileTree.length === 0) return <h1>There's nothing to show</h1>;

  return (
    <SelectedContext.Provider value={{ setSelected }}>
      <div style={{ display: "flex", flexWrap: "nowrap", height: "100vh" }}>
        <div className={classes.container}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => send("EXPAND_ALL")}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              Expand all
            </Button>
            <Button onClick={() => send("COLLAPSE_ALL")}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.93149 11.8183C4.75579 11.6425 4.75579 11.3576 4.93149 11.1819L7.1815 8.93187C7.35724 8.75617 7.64216 8.75617 7.8179 8.93187L10.0679 11.1819C10.2436 11.3576 10.2436 11.6425 10.0679 11.8183C9.89216 11.994 9.60724 11.994 9.4315 11.8183L7.4997 9.88647L5.5679 11.8183C5.39216 11.994 5.10724 11.994 4.93149 11.8183Z"
                  fill="black"
                />
                <path
                  d="M10.0678 3.1318C10.2435 3.30754 10.2435 3.59246 10.0678 3.7682L7.81777 6.01821C7.64203 6.19391 7.35711 6.19391 7.18137 6.01821L4.93137 3.7682C4.75563 3.59246 4.75563 3.30754 4.93137 3.1318C5.10711 2.95607 5.39203 2.95607 5.56777 3.1318L7.49957 5.06361L9.43137 3.1318C9.60711 2.95607 9.89203 2.95607 10.0678 3.1318Z"
                  fill="black"
                />
              </svg>
              Collapse all
            </Button>
          </div>
          <SearchInput onSearch={handleSearch} />
          <FileTree
            state={state}
            send={send}
            files={filteredFileTree}
            level={0}
          />
        </div>
        <div
          style={{
            color: "#333333",
            display: "flex",
            alignItems: "center",
            fontSize: "0.75rem",
            flexGrow: "1",
            justifyContent: "center",
          }}
        >
          {selected ? (
            <>
              <pre
                style={{
                  fontFamily: `Menlo, Monaco, Consolas, monospace`,
                  background: "rgba(220, 220, 230, 0.75)",
                  padding: "0px 4px",
                  marginRight: 4,
                  borderRadius: 4,
                }}
              >
                {selected.name}
              </pre>
              {selected.type} currently selected
            </>
          ) : (
            "Nothing currently selected"
          )}
        </div>
      </div>
    </SelectedContext.Provider>
  );
};

export default FileTreeContainer;
