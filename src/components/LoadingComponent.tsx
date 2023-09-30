import { Space, Spin } from "antd"

export default function LoadingComponent () {
  return (
    <Space direction="vertical" style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
      <Spin size="large" />
    </Space>
  )
}