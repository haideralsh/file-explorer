import { useSelectedContext } from "./SelectedContext";
import { FileIcon } from "../theme/icons";
import styled from "@emotion/styled";
import { useId } from "react";
import colors from "../theme/colors";

export type FileProps = {
  name: string;
  level: number;
};

const File: React.FC<FileProps> = ({ name, level }) => {
  const id = useId();
  const { selected, setSelected } = useSelectedContext();

  function handleClick() {
    setSelected({ id, name, type: "file" });
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

const FileName = styled.span<{ selected: boolean; level: number }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding-top: 2px;
  padding-bottom: 2px;
  line-height: 20px;
  background-color: ${(props) =>
    props.selected ? colors.lightGrey2 : colors.transparent};
  padding-left: ${(props) => props.level * 8 + 18}px;

  font-size: 0.75rem;

  color: ${colors.grey};
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightGrey2};
  }
`;

export default File;
