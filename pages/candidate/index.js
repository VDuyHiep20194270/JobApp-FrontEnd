import SiderCandidate from "@/components/SiderCandidate";
import {
  Col,
  Row,
  Input,
  Upload,
  Button,
  Divider,
  Form,
  Spin,
  Select,
  DatePicker,
  message,
} from "antd";
import dayjs from "dayjs";
import AppContext from "@/components/AppContext";
import axios from "axios";
import { useState, useContext, useEffect } from "react";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

export default function Candidate() {
  const dateFormat = "YYYY-MM-DD";
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { token, setToken } = useContext(AppContext);
  const [dateString, setDateString] = useState("");
  const [candidate, setCandidate] = useState({});

  const onChangeDate = (date, dateString) => {
    setDateString(dateString);
  };

  const setFormData = (candidate) => {
    const user = candidate.user;
    setDateString(user.birthDate);
    form.setFieldsValue({
      degree: candidate?.degree,
      career: candidate?.career,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      gender: user?.gender,
      birthDate: dayjs(user?.birthDate),
      location: user?.location,
    });
  };

  useEffect(() => {
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
        "content-type": "text/json",
      },
    };
    axios
      .get(`${URL}/api/v1/candidate`, config)
      .then((res) => {
        setCandidate(res.data);
        console.log(res.data);
        setFormData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const validateEmail = (rule, value) => {
    if (
      value != undefined &&
      (!value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
    ) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid email");
  };

  const onFinish = (values) => {
    values.birthDate = dateString;
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
        "content-type": "application/json",
      },
    };
    axios
      .put(`${URL}/api/v1/user`, values, config)
      .then((res) => {
        message.success("Update successfully");
        console.log(res.data);
      })
      .catch((err) => {
        message.error(`${err}`);
        console.log(err);
      });
    axios
      .put(`${URL}/api/v1/candidate`, values, config)
      .then((res) => {
        message.success("Update successfully");
        console.log(res.data);
      })
      .catch((err) => {
        message.error(`${err}`);
        console.log(err);
      });
  };

  return (
    <main>
      <h1 className="mb-9">Thông tin tài khoản</h1>
      <Spin spinning={loading}>
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
                name={"lastName"}
                label="Họ"
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
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="Tên"
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
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 12 }}
                label="Giới tính"
                name="gender"
                initialValue="MALE"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền đầy đủ",
                  },
                ]}
              >
                <Select
                  defaultValue="MALE"
                  className="text-base"
                  options={[
                    {
                      value: "MALE",
                      label: "Nam",
                    },
                    {
                      value: "FEMALE",
                      label: "Nữ",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* TODO */}
              <Form.Item
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 12 }}
                label="Ngày sinh"
                name="birthDate"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền đầy đủ",
                  },
                ]}
              >
                <DatePicker
                  format={dateFormat}
                  value={dayjs()}
                  onChange={onChangeDate}
                  style={{ width: "100%" }}
                  placeholder=""
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 12 }}
                rules={[
                  {
                    required: true,
                    message: "Email không xác định",
                    validator: validateEmail,
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Location"
                name="location"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 12 }}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền đầy đủ",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
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
            <Col span={12}>
              <Form.Item
                label="Ngành nghề"
                name="career"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 12 }}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền đầy đủ",
                  },
                ]}
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
      </Spin>
    </main>
  );
}

Candidate.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderCandidate>{page}</SiderCandidate>
    </>
  );
};
