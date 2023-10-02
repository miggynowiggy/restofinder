import { Typography } from "antd";

interface IErrorComponentProps {
  errorMessage: string;
}

export default function ErrorComponent({ errorMessage }: IErrorComponentProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <Typography.Title>
        {errorMessage ?? "Something went wrong..."}
      </Typography.Title>
    </div>
  );
}
