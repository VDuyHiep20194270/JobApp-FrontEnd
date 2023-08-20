import {
  Button,
  Modal,
  Row,
  Col,
  Table,
  Divider,
  Form,
  Space,
  Input,
  TimePicker,
  DatePicker,
  message,
} from "antd";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import AppContext from "@/components/AppContext";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

const MeetingList = ({ open, close, jobID }) => {
  const [form] = Form.useForm();
  const { token, setToken } = useContext(AppContext);
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [newMeeting, setNewMeeting] = useState(false)
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Bắt đầu",
      key: "timeStart",
      dataIndex: "timeStart",
    },
    {
      title: "Kết thúc",
      key: "timeFinish",
      dataIndex: "timeFinish",
    },
    {
      title: "Link",
      key: "link",
      dataIndex: "link",
    },
    {
      title: "Miêu tả",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>FeedBack</a>
    //     </Space>
    //   ),
    // },
  ];

  const onChangeTimeStart = (date, dateString) => {
    setTimeStart(dateString);
  };

  const onChangeTimeFinish = (date, dateString) => {
    setTimeFinish(dateString);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let tokenResponse;
    if (token === "") {
      tokenResponse = window.localStorage.getItem("token");
      setToken(window.localStorage.getItem("token"));
    } else {
      tokenResponse = token;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenResponse}`,
        "content-type": "application/json",
      },
    };
    axios
      .get(`${URL}/api/v1/interview?jobId=${jobID}`, config)
      .then((res) => {
        setData(res.data)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[jobID, newMeeting])

  const onFinish = (values) => {
    values.timeFinish = timeFinish;
    values.timeStart = timeStart;
    console.log(values);
    let tokenResponse;
    if (token === "") {
      tokenResponse = window.localStorage.getItem("token");
      setToken(window.localStorage.getItem("token"));
    } else {
      tokenResponse = token;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenResponse}`,
        "content-type": "application/json",
      },
    };
    axios
      .post(`${URL}/api/v1/interview?jobId=${jobID}`, values, config)
      .then((res) => {
        console.log(res.data);
        setNewMeeting(!newMeeting)
        message.success("Tạo lịch thành công!")
      })
      .catch((err) => {
        message.error("Tạo lịch thất bại!")
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        title="Tạo cuộc phỏng vấn"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className="mt-8">
          <Form form={form} onFinish={onFinish}>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="link"
                  label="Meeting"
                  rules={[
                    {
                      required: true,
                      message: "Hãy điều đầy đủ",
                    },
                  ]}
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 12 }}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="time_start"
                  label="Thời gian bắt đầu"
                  rules={[
                    {
                      required: true,
                      message: "Hãy điều đầy đủ",
                    },
                  ]}
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 12 }}
                >
                  <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    value={dayjs()}
                    onChange={onChangeTimeStart}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="time_finish"
                  label="Thời gian kết thúc"
                  rules={[
                    {
                      required: true,
                      message: "Hãy điều đầy đủ",
                    },
                  ]}
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 12 }}
                >
                  <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    value={dayjs()}
                    onChange={onChangeTimeFinish}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Miêu tả"
                  rules={[
                    {
                      required: true,
                      message: "Hãy điều đầy đủ",
                    },
                  ]}
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 12 }}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Divider>
                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large">
                    Cập nhật
                  </Button>
                </Form.Item>
              </Divider>
            </Row>
          </Form>
        </div>
      </Modal>
      <Modal
        title="Danh sách ứng tuyển"
        centered
        footer={null}
        open={open}
        onOk={close}
        onCancel={close}
        width={1200}
      >
        <Row>
          <Divider
            orientation="right"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <Button
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
            >
              Thêm meeting
            </Button>
          </Divider>
          <Col span={24}>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default MeetingList;
