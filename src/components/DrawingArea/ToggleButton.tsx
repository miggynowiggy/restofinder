import {
  CloseOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { FloatButton, Tooltip } from "antd";

interface IToggleButtonProps {
  showDraw: boolean;
  isDrawn: boolean;
  setShape: (shape: string) => void;
  toggleDrawing: () => void;
  clearDrawing: () => void;
}

export default function ToggleButton({
  showDraw,
  isDrawn,
  setShape,
  toggleDrawing,
  clearDrawing
}: IToggleButtonProps) {
  if (!showDraw) return null;

  return (
    <>
      <FloatButton.Group shape="square" style={{ right: 10, bottom: 200 }}>
        <Tooltip placement="left" title="Draw Circle">
          <FloatButton
            icon={<PlusCircleOutlined />}
            onClick={() => setShape("circle")}
          />
        </Tooltip>
        <Tooltip placement="left" title="Draw Rectangle">
          <FloatButton
            icon={<PlusSquareOutlined />}
            onClick={() => setShape("rectangle")}
          />
        </Tooltip>
        {isDrawn && (
          <Tooltip placement="left" title="Clear Drawing">
            <FloatButton icon={<DeleteOutlined />} onClick={clearDrawing} />
          </Tooltip>
        )}
        <Tooltip placement="left" title="Cancel Drawing">
          <FloatButton icon={<CloseOutlined />} onClick={toggleDrawing} />
        </Tooltip>
      </FloatButton.Group>
    </>
  );
}
