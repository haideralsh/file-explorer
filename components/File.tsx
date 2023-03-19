import { css } from "@emotion/css";
import { useSelectedContext } from "./SelectedContext";

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
      {fileIcon}
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
      border-radius: 4px;
    }
  `,
};

const fileIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z"
      fill="#6B7884"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export default File;
