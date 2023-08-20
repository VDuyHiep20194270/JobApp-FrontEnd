import SiderOwner from "@/components/SiderOwner";
import {
  Col,
  Row,
  Input,
  Button,
  Divider,
  Form,
  Select,
  DatePicker,
  Spin,
  message
} from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "@/components/AppContext";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

export default function Owner() {
  const dateFormat = "YYYY-MM-DD";
  const { token, setToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [dateString, setDateString] = useState("");
  const [user, setUser] = useState({});

  const onChangeDate = (date, dateString) => {
    setDateString(dateString);
  };

  const setFormData = (user) => {
    setDateString(user.birthDate)
    form.setFieldsValue({
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
      tokenResponse = window.localStorage.getItem("token");
      setToken(window.localStorage.getItem("token"));
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
      .get(`${URL}/api/v1/user`, config)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
        setFormData(res.data);
        setLoading(false);
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
      .put(`${URL}/api/v1/user`, values, config)
      .then((res) => {
        message.success('Update successfully');
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
          // name="user"
          form={form}
          initialValues={{
            remember: true,
            ...user,
            // birthDate: dayjs(user.birthDate),
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
                // initialValues={dayjs(user.birthDate)}
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

Owner.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderOwner>{page}</SiderOwner>
    </>
  );
};
