
import { FileTree } from "../models/fileTree";
import Directory from "./Directory";
import File from "./File";

export type FileTreeProps = {
  files: FileTree;
  [key: string]: any;
};

const FileTree: React.FC<FileTreeProps> = ({ files, send, state, level }) => {


  return (
    <ul style={{ margin: 0, listStyleType: "none", padding: 0 }}>
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
    </ul>
  );
};

export default FileTree;
