import { useState } from "react";
import { css } from '@emotion/css'
import {
  FileTree as FileTreeType,
  fileTreeMachine,
  find,
} from "../models/fileTree";
import FileTree from "./FileTree";
import { useMachine } from "@xstate/react";
import SearchInput from "./SearchInput";
import { SelectedContext, SelectedNode } from "./SelectedContext";
import Controls from "./Controls";

const classes = {
  container: css`
    display: flex;
    flex-direction: column;
    max-width: 288px;
    gap: 5px;
    border-right: 1px solid;
    border-color: rgba(220, 220, 230, 0.75);
  `,
};

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
    <SelectedContext.Provider value={{ selected, setSelected }}>
      <div style={{ display: "flex", flexWrap: "nowrap", minHeight: "100vh" }}>
        <div className={classes.container}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "288px",
            gap: 5
          }}>
            <Controls onExpandAll={() => { send("EXPAND_ALL") }} onCollapseAll={() => { send("COLLAPSE_ALL") }} />
            <SearchInput onSearch={handleSearch} />
          </div>
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
                  fontFamily: `'JetBrains Mono', monospace`,
                  background: "rgba(220, 220, 230, 0.25)",
                  border: "1px solid rgba(220, 220, 230, 0.75)",
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
