import { Spin } from "antd";

export default function LoadingComponent() {
  return (
    <div className="flex items-center justify-center w-full h-full p-5">
      <Spin size="large" />
    </div>
  );
}
