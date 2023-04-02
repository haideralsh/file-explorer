import { useEffect, useState } from "react";
import { css } from '@emotion/css'
import FileTree from "./FileTree";
import type { FileTree as FileTreeType } from "../models/fileTree";
import { useSelectedContext } from "./SelectedContext";
import styled from "@emotion/styled";
import { DirectoryOpenIcon, DirectoryClosedIcon, TriangleDown, TriangleRight } from "../icons";

export type DirectoryProps = {
  name: string;
  files: FileTreeType;
  [key: string]: any;
};

const Directory: React.FC<DirectoryProps> = ({
  id,
  name,
  files,
  state,
  send,
  level,
}) => {
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
    <ul
      role="tree"
      aria-label="Files"
      style={{ margin: 0, listStyleType: "none", padding: 0 }}
    >
      <li
        role="treeitem"
        onClick={handleClick}
      >
        <DirectoryName level={level} selected={selected?.id === id}>
          {showChildren ? <TriangleDown /> : <TriangleRight />}
          <span className={classes.directoryWrapper}>
            {showChildren ? <DirectoryOpenIcon /> : <DirectoryClosedIcon />}
            {name}
          </span>
        </DirectoryName>
      </li>
      {showChildren && (
        <li>
          <FileTree
            files={files}
            state={state}
            send={send}
            level={level + 1}
          />
        </li>
      )}
    </ul >
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
  background-color: ${props => props.selected ? "rgba(229, 232, 236, 0.5)" : "transparent"};
  padding-left: ${props => props.level * 8 + 18}px;

  &:hover {
    background-color: rgba(229, 232, 236, 0.5);
  }

  font-size: 0.75rem;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  color: #333333;
`

const classes = {
  indentation: css`
    margin-left: 2rem;
  `,

  directoryWrapper: css`
    cursor: pointer;
    display: flex;
    gap: 0.2rem;
    align-items: center;
  `,
};

export default Directory;
