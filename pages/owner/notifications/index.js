import ChooseMeeting from "@/components/ChooseMeeting";
import SiderOwner from "@/components/SiderOwner"
import { Col, Row, Input, Button, Divider, Space, Table, Tag } from 'antd'
import { useState } from "react";

export default function Notifications() {
  const [ openChooseMeeting, setOpenChooseMeeting] = useState(false)
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: '1',
    },
    {
      title: 'Người gửi',
      dataIndex: 'sender',
      key: '2',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: '3',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Truy cập</a>
          <a>Xóa</a>
          <a onClick={() => setOpenChooseMeeting(true)}>Chọn lịch phỏng vấn ngay</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      content: '50',
      sender: 'Developer',
      status: 1
    },
  ];
  return(
    <main>
      List of notification right here
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
      <ChooseMeeting open={openChooseMeeting} close={() => setOpenChooseMeeting(false)} />
    </main>
  )
}

Notifications.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderOwner>
        {page}
      </SiderOwner>
    </>
  )
}