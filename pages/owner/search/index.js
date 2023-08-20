import SiderOwner from "@/components/SiderOwner";
import {
  Col,
  Row,
  Input,
  Button,
  Divider,
  Space,
  Table,
  Form,
  Select,
  DatePicker
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import AsynchronouslyCloseModal from "@/components/AsynchronouslyCloseModal";

function Search() {
  const [open, setOpen] = useState(false)
  const dateFormat = "YYYY-MM-DD";
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Ngành nghề",
      key: "career",
      dataIndex: "career",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Địa chỉ",
      key: "location",
      dataIndex: "location",
    },
    {
      title: "CV",
      key: "CV",
      dataIndex: "CV",
      render: (_, record) => (
        <Space size="middle">
          <a>{record.CV}</a>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={openModal}>Mời ứng tuyển</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      gender: "Male",
      name: "John Brown",
      dateOfBirth: '2022-01-21',
      location: "New York No. 1 Lake Park",
      career: "developer",
      CV: "link"
    },
  ];
  const [dateString, setDateString] = useState('')
  const [form] = Form.useForm();
  const openModal = () => {
    setOpen(true)
  }
  const onChangeDate = (date, dateString) => {
    setDateString(dateString)
  };
  const onFinish = (values) => {
    values.dateOfBirth = dateString
    console.log("Received values of form: ", values);
  };
  return (
    <main>
      <AsynchronouslyCloseModal open={open} closeModal={() => setOpen(false)} />
      <h1>Tìm kiếm hồ sơ</h1>
      <Form
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              name="career"
              label="Ngành nghề"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Giới tính"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Select
                defaultValue="male"
                className="text-base"
                value=""
                options={[
                  { value: "male", label: "Nam" },
                  { value: "female", label: "Nữ" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              name="province"
              label="Tỉnh"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dateOfBirth"
              label="Sinh"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <DatePicker
                format={dateFormat}
                onChange={onChangeDate}
                style={{ width: "100%" }}
                placeholder=""
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Divider>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<SearchOutlined />}
              >
                Tìm kiếm
              </Button>
            </Form.Item>
          </Divider>
        </Row>
      </Form>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </main>
  );
}

export default Search;

Search.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderOwner>{page}</SiderOwner>
    </>
  );
};
