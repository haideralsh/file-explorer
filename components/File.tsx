import { useSelectedContext } from "./SelectedContext";
import { FileIcon } from "../icons";
import styled from "@emotion/styled";

export type FileProps = {
  name: string;
  level: number;
  id: string
};

const FileName = styled.span<{ selected: boolean; level: number }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding-top: 2px;
  padding-bottom: 2px;
  line-height: 20px;
  background-color: ${props => props.selected ? "rgba(229, 232, 236, 0.5)" : "transparent"};
  padding-left: ${props => props.level * 8 + 18}px;

  font-size: 0.75rem;

  color: #333333;
  cursor: pointer;

  &:hover {
    background-color: rgba(229, 232, 236, 0.5);
  }
`

const File: React.FC<FileProps> = ({ id, name, level }) => {
  const { selected, setSelected } = useSelectedContext();

  function handleClick() {
    setSelected({ id, name, type: "file" })
  }

  return (
    <FileName
      selected={selected?.id === id}
      level={level}
      role="button"
      onClick={handleClick}

    >
      <FileIcon />
      {name}
    </FileName>
  );
};

export default File;
