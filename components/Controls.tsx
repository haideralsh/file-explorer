import styled from '@emotion/styled'
import { CollapseIcon, ExpandIcon } from '../icons';

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  gap: 2px;
  padding: 2px 4px;
  border-radius: 4px;

  font-size: 11px;
  background-color: #ffffff;

  &:hover {
    background-color: rgba(220, 220, 230, 0.75);
  }
`;

type ControlsProps = {
  onExpandAll: () => void;
  onCollapseAll: () => void
};

const Controls: React.FC<ControlsProps> = ({ onExpandAll, onCollapseAll }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button onClick={onExpandAll}>
        <ExpandIcon />
        Expand all
      </Button>
      <Button onClick={onCollapseAll}>
        <CollapseIcon />
        Collapse all
      </Button>
    </div>
  )
}

export default Controls;
