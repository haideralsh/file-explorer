import { useSelectedContext } from "./SelectedContext";
import { css } from '@emotion/css'
import { FileIcon } from "../icons";

export type FileProps = {
  name: string;
  [key: string]: any;
};

const File: React.FC<FileProps> = ({ name, level }) => {
  const { setSelected } = useSelectedContext();

  return (
    <span
      role="button"
      style={{ paddingLeft: `${level * 8 + 18}px` }}
      onClick={() => setSelected({ name, type: "file" })}
      className={classes.fileName}
    >
      <FileIcon />
      {name}
    </span>
  );
};

const classes = {
  icon: css`
    width: 1rem;
    height: 1rem;
    color: #a5a6a8;
  `,

  fileName: css`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding-top: 2px;
    padding-bottom: 2px;
    line-height: 20px;

    font-size: 0.75rem;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    color: #333333;
    cursor: pointer;

    &:hover {
      background-color: rgba(229, 232, 236, 0.5);
    }
  `,
};

export default File;
