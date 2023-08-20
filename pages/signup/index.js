import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Select, Col, Row, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from 'axios';
import FormSignUp from "@/components/FormSignUp";

const URL = process.env.NEXT_PUBLIC_HOSTNAME

export default function SignUp() {
  const [form] = Form.useForm();
  const [dateString, setDateString] = useState("");
  const onChangeDate = (data, dateString) => {
    console.log(dateString);
    setDateString(dateString);
  };
  const onFinish = (values) => {
    if (values.acceptLicense) {
      delete values.acceptLicense;
      delete values.confirm;
      values.birthDate = dateString;
      console.log("Received values of form: ", values);
      axios
        .post(`${URL}/api/v1/auth/signup`, values)
        .then((res) => {
          message.success(res.data);
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    } else {
    }
  };

  return (
    <div className="bg-screen flex justify-center items-center relative">
      <svg
        className="absolute top-0 left-0 h-10 pt-7 pl-7"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 102 28"
        role="img"
        aria-hidden="true"
      >
        <path
          fill="#C6CAFF"
          d="M28.18,19.06A6.54,6.54,0,0,1,23,16c.67-5.34,2.62-7,5.2-7s4.54,2,4.54,5-2,5-4.54,5m0-13.34a7.77,7.77,0,0,0-7.9,6.08,26,26,0,0,1-1.93-5.62H12v7.9c0,2.87-1.3,5-3.85,5s-4-2.12-4-5l0-7.9H.49v7.9A8.61,8.61,0,0,0,2.6,20a7.27,7.27,0,0,0,5.54,2.35c4.41,0,7.5-3.39,7.5-8.24V8.77a25.87,25.87,0,0,0,3.66,8.05L17.34,28h3.72l1.29-7.92a11,11,0,0,0,1.36,1,8.32,8.32,0,0,0,4.14,1.28h.34A8.1,8.1,0,0,0,36.37,14a8.12,8.12,0,0,0-8.19-8.31"
        ></path>
        <path
          fill="#C6CAFF"
          d="M80.8,7.86V6.18H77.2V21.81h3.65V15.69c0-3.77.34-6.48,5.4-6.13V6c-2.36-.18-4.2.31-5.45,1.87"
        ></path>
        <polygon
          fill="#C6CAFF"
          points="55.51 6.17 52.87 17.11 50.05 6.17 45.41 6.17 42.59 17.11 39.95 6.17 36.26 6.17 40.31 21.82 44.69 21.82 47.73 10.71 50.74 21.82 55.12 21.82 59.4 6.17 55.51 6.17"
        ></polygon>
        <path
          fill="#C6CAFF"
          d="M67.42,19.07c-2.59,0-4.53-2.05-4.53-5s2-5,4.53-5S72,11,72,14s-2,5-4.54,5m0-13.35A8.1,8.1,0,0,0,59.25,14,8.18,8.18,0,1,0,75.6,14a8.11,8.11,0,0,0-8.18-8.31"
        ></path>
        <path
          fill="#C6CAFF"
          d="M91.47,14.13h.84l5.09,7.69h4.11l-5.85-8.53a7.66,7.66,0,0,0,4.74-7.11H96.77c0,3.37-2.66,4.65-5.3,4.65V0H87.82V21.82h3.64Z"
        ></path>
      </svg>
      <Form
        form={form}
        name="normal_login"
        className="signup-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className="flex justify-between h-10 mb-6">
          <div className="text-2xl font-medium text-[#0E101A]">Đăng ký</div>
        </div>
        <Row gutter={20}>
          <Col span={10}>
            <h3>Vai trò của bạn là</h3>
            <Form.Item
              style={{ width: "80%" }}
              name="role"
              initialValue="CANDIDATE"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn vai trò của bạn",
                },
              ]}
            >
              <Select
                defaultValue="CANDIDATE"
                className="text-base"
                value=""
                options={[
                  { value: "COMPANY", label: "Người tuyển dụng" },
                  { value: "CANDIDATE", label: "Người ứng tuyển" },
                ]}
              />
            </Form.Item>
            <Link href="/signin" className="hover:underline">
              Quay lại trang đăng nhập
            </Link>
          </Col>
          <Col span={14}>
            <FormSignUp onChangeDate={onChangeDate} />
            <div className="flex">
              <Form.Item
                name="acceptLicense"
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                  () => ({
                    validator(rule, value) {
                      if (value === true) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Hãy đọc quy tắc của chúng tôi");
                    },
                  }),
                ]}
              >
                <Checkbox>Cam kết tuân thủ quy định</Checkbox>
              </Form.Item>
              <a
                className="login-form-forgot hover:underline mt-[5px]"
                href="#"
              >
                Quy định của chúng tôi
              </a>
            </div>
            <Form.Item>
              <div className="flex justify-center mt-3">
                <Button type="primary" htmlType="submit" className="w-1/2">
                  Đăng kí
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
