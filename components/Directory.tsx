import { useEffect, useState } from "react";
import { css } from '@emotion/css'
import FileTree from "./FileTree";
import type { FileTree as FileTreeType } from "../models/fileTree";
import { useSelectedContext } from "./SelectedContext";
import { DirectoryIcon, TriangleDown, TriangleRight } from "../icons";

export type DirectoryProps = {
  name: string;
  files: FileTreeType;
  [key: string]: any;
};

const Directory: React.FC<DirectoryProps> = ({
  name,
  files,
  state,
  send,
  level,
}) => {
  const [showChildren, setShowChildren] = useState(false);
  const { setSelected } = useSelectedContext();

  function handleClick() {
    toggleShowChildren();
    setSelected({ name, type: "directory" });
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
        <span
          style={{ paddingLeft: `${level * 8}px` }}
          className={classes.directoryName}
        >
          {showChildren ? <TriangleDown /> : <TriangleRight />}
          <span className={classes.directoryWrapper}>
            <DirectoryIcon />
            {name}
          </span>
        </span>
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

const classes = {
  indentation: css`
    margin-left: 2rem;
  `,

  directoryName: css`
    cursor: pointer;
    display: flex;
    gap: 0.2rem;
    align-items: center;
    padding-top: 2px;
    padding-bottom: 2px;
    line-height: 20px;

    &:hover {
      background-color: rgba(229, 232, 236, 0.5);
    }

    font-size: 0.75rem;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    color: #333333;
  `,

  directoryWrapper: css`
    cursor: pointer;
    display: flex;
    gap: 0.2rem;
    align-items: center;
  `,
};

export default Directory;
