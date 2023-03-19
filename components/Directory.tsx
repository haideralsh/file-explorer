import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import FileTree from "./FileTree";
import type { FileTree as FileTreeType } from "../models/fileTree";
import { useSelectedContext } from "./SelectedContext";

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
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 11L6 4L10.5 7.5L6 11Z" fill="#6B7884"></path>
          </svg>
          <span className={classes.directoryWrapper}>
            {directoryIcon}
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
  icon: css`
    width: 20px;
    height: 20px;
    color: #a4b2bf;
  `,

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
      border-radius: 4px;
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

const directoryIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={classes.icon}
  >
    <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z" />
  </svg>
);

export default Directory;
