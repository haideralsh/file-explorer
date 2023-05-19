import { useState } from "react";
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
import styled from "@emotion/styled";

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
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "288px",
              gap: 5,
            }}
          >
            <Controls
              onExpandAll={() => {
                send("EXPAND_ALL");
              }}
              onCollapseAll={() => {
                send("COLLAPSE_ALL");
              }}
            />
            <SearchInput onSearch={handleSearch} />
          </div>
          <FileTree
            state={state as any}
            send={send}
            files={filteredFileTree}
            level={0}
          />
        </Container>
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
              <DisplayedFileName>{selected.name}</DisplayedFileName>
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

const DisplayedFileName = styled.pre`
		font-family: 'JetBrains Mono', monospace;
		background: rgba(220, 220, 230, 0.25);
		border: 1px solid rgba(220, 220, 230, 0.75);
		padding: 0px 4px;
		margin-right: 4px;
		border-radius: 4px;
  `;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 288px;
  gap: 5px;
  border-right: 1px solid;
  border-color: rgba(220, 220, 230, 0.75);
`;

export default FileTreeContainer;
