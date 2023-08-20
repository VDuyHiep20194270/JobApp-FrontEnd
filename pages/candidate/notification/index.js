import SiderCandidate from "@/components/SiderCandidate";
import { Col, Row, Table, Space } from 'antd'

export default function Notification(){
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Nội dung",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Xác nhận</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      gender: "Male",
      name: "John Brown",
      dateOfBirth: "2022-01-21",
      location: "New York No. 1 Lake Park",
      career: "developer",
      CV: "link",
      status: 1,
    },
    {
      key: "2",
      gender: "Male",
      name: "Hien le",
      dateOfBirth: "2022-01-21",
      location: "New York No. 1 Lake Park",
      career: "developer",
      CV: "link",
      status: 2,
    },
  ];
  return(
    <main>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </main>
  )
}

Notification.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderCandidate>{page}</SiderCandidate>
    </>
  );
};
