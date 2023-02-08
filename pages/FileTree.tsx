type File = {
  name: string;
  children?: Files;
};

type Files = Array<File>;

type FileTreeProps = {
  files: Files
};

type FileProps = {
  name: string;
};

const File: React.FC<FileProps> = ({ name }) => {
  return <p>📄 {name}</p>;
};

const Directory: React.FC<FileProps> = ({ name, children }) => {
  return (<div>
    <p>🗂 {name}</p>
    <div style={{ marginLeft: 20 }}>
    <FileTree files={children} />
    </div>
  </div>)
};

const FileTree: React.FC<FileTreeProps> = ({ files }) => {
  return files.map(file => {
    if (file.children) return <Directory name={file.name} children={file.children} />
    
    return <File name={file.name} />

  })
};

export default FileTree;
