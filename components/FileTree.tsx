import styled from "@emotion/styled";
import type {
  FileTree as FileTreeType,
  FileTreeEvent,
} from "../models/fileTree";
import Directory from "./Directory";
import File from "./File";

export type FileTreeProps = {
  files: FileTreeType;
  state: { value: string };
  send: (k: FileTreeEvent) => void;
  level: number;
};

const FileTree: React.FC<FileTreeProps> = ({ files, send, state, level }) => {
  return (
    <FileList role="tree" aria-label="Files">
      {files.map(({ name, files }) => {
        if (files)
          return (
            <Directory
              key={name}
              name={name}
              files={files}
              state={state}
              send={send}
              level={level + 1}
            />
          );

        return <File key={name} name={name} level={level + 1} />;
      })}
    </FileList>
  );
};

export const FileList = styled.ul`
  margin: 0;
  list-style-type: none;
  padding: 0;
`;

export default FileTree;
