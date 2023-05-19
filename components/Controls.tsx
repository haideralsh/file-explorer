import styled from "@emotion/styled";
import { CollapseIcon, ExpandIcon } from "../theme/icons";
import colors from "../theme/colors";

type ControlsProps = {
	onExpandAll: () => void;
	onCollapseAll: () => void;
};

const Controls: React.FC<ControlsProps> = ({ onExpandAll, onCollapseAll }) => {
	return (
		<ControlsWrapper>
			<Button onClick={onExpandAll}>
				<ExpandIcon />
				Expand all
			</Button>
			<Button onClick={onCollapseAll}>
				<CollapseIcon />
				Collapse all
			</Button>
		</ControlsWrapper>
	);
};

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 15px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  gap: 2px;
  padding: 2px 4px;
  border-radius: 4px;

  font-size: 11px;
  background-color: ${colors.white};

  &:hover {
    background-color: ${colors.lightGrey};
  }
`;

export default Controls;
