import SiderCandidate from "@/components/SiderCandidate";
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
  DatePicker,
  message,
} from "antd";
import AppContext from "@/components/AppContext";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CreateApplication from "@/components/CreateApplication";
import Link from "next/link";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

export default function Search() {
  const dateFormat = "YYYY-MM-DD";
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Vị trí",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <b>{record.jobName} - {record.career}</b>,
    },
    {
      title: "Hạn nộp",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Trình độ",
      key: "level",
      dataIndex: "level",
    },
    {
      title: "Mức lương",
      key: "salary",
      dataIndex: "salary",
    },
    {
      title: "Tỉnh",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={
            () => {
              setJobID(record.id)
              setShowApplication(true)
            }
          }>Ứng tuyển</a>
          <Link href={`/candidate/job/${record.id}`}>Xem thêm</Link>
        </Space>
      ),
    },
  ];
  const [form] = Form.useForm();
  const [showApplication, setShowApplication] = useState(false)
  const { token, setToken } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [jobID, setJobID] = useState();

  const onFinish = (values) => {
    values.salary = parseInt(values.salary);
    console.log("Received values of form: ", values);
    let tokenResponse;
    if (token === "") {
      tokenResponse = window.localStorage.getItem("tokenCandidate");
      setToken(window.localStorage.getItem("tokenCandidate"));
    } else {
      tokenResponse = token;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenResponse}`,
      },
      params: values
    };
    axios
      .get(`${URL}/api/v1/candidate/searchJob`, config)
      .then((res) => {
        message.success("Update successfully");
        setData(res.data)
        console.log(res.data);
      })
      .catch((err) => {
        message.error(`${err}`);
        console.log(err);
      });
  };

  return (
    <main>
      <CreateApplication
        open={showApplication}
        close={() => setShowApplication(false)}
        jobID={jobID}
      />
      <h1>Tìm kiếm việc làm</h1>
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
              initialValue=""
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="salary"
              label="Mức lương"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
              initialValue={0}
            >
              <Input defaultValue={0} size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              name="location"
              initialValue=""
              label="Tỉnh"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="degree"
              label="Bằng cấp"
              initialValue="CUNHAN"
              rules={[
                {
                  required: true,
                  message: "Hãy điều đầy đủ",
                },
              ]}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Select
                defaultValue="CUNHAN"
                className="text-base"
                options={[
                  {
                    value: "CUNHAN",
                    label: "Cử nhân",
                  },
                  {
                    value: "KISU",
                    label: "Kĩ sư",
                  },
                  {
                    value: "THPT",
                    label: "Tốt nghiệp THPT",
                  },
                  {
                    value: "THCS",
                    label: "Tốt nghiệp THCS",
                  },
                  {
                    value: "TIEUHOC",
                    label: "Tốt nghiệp tiểu học",
                  },
                  {
                    value: "TIENSI",
                    label: "Tiến sĩ",
                  },
                ]}
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

Search.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderCandidate>{page}</SiderCandidate>
    </>
  );
};
