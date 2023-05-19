import { useEffect, useId, useState } from "react";
import FileTree, { FileList } from "./FileTree";
import type {
  FileTree as FileTreeType,
  FileTreeEvent,
} from "../models/fileTree";
import { useSelectedContext } from "./SelectedContext";
import styled from "@emotion/styled";
import {
  DirectoryOpenIcon,
  DirectoryClosedIcon,
  TriangleDown,
  TriangleRight,
} from "../theme/icons";
import colors from "../theme/colors";
import fonts from "../theme/fonts";

export type DirectoryProps = {
  name: string;
  files: FileTreeType;
  state: { value: string };
  send: (k: FileTreeEvent) => void;
  level: number;
};

const Directory: React.FC<DirectoryProps> = ({
  name,
  files,
  state,
  send,
  level,
}) => {
  const id = useId();
  const [showChildren, setShowChildren] = useState(false);
  const { selected, setSelected } = useSelectedContext();

  function handleClick() {
    toggleShowChildren();
    setSelected({ id, name, type: "directory" });
  }

  function toggleShowChildren() {
    setShowChildren((s) => !s);
    showChildren ? send("COLLAPSE_NODE") : send("EXPAND_NODE");
  }

  useEffect(() => {
    switch (state.value) {
      case "expanded":
        setShowChildren(true);
        break;

      case "collapsed":
        setShowChildren(false);
        break;

      default:
        return;
    }
  }, [state.value]);

  return (
    <FileList role="tree" aria-label="Files">
      <li role="treeitem" onClick={handleClick}>
        <DirectoryName level={level} selected={selected?.id === id}>
          {showChildren ? <TriangleDown /> : <TriangleRight />}
          <DirectoryNameWrapper>
            {showChildren ? <DirectoryOpenIcon /> : <DirectoryClosedIcon />}
            {name}
          </DirectoryNameWrapper>
        </DirectoryName>
      </li>
      {showChildren && (
        <li>
          <FileTree files={files} state={state} send={send} level={level + 1} />
        </li>
      )}
    </FileList>
  );
};

const DirectoryName = styled.span<{ selected: boolean; level: number }>`
  cursor: pointer;
  display: flex;
  gap: 0.2rem;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 2px;
  line-height: 20px;
  background-color: ${(props) =>
    props.selected ? colors.lightGrey2 : colors.transparent};
  padding-left: ${(props) => props.level * 8 + 18}px;

  &:hover {
    background-color: ${colors.lightGrey2};
  }

  font-size: 0.75rem;
  font-family: ${fonts.default};

  color: ${colors.grey};
`;

const DirectoryNameWrapper = styled.span`
  cursor: pointer;
  display: flex;
  gap: 0.2rem;
  align-items: center;
`;

export default Directory;
