import React, { use, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Col,
  Row,
  DatePicker,
  ConfigProvider,
  InputNumber,
} from "antd";

export default function FormSignUp({ onChangeDate }) {
  const dateFormat = "YYYY-MM-DD";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const validatePhoneNumber = (rule, value) => {
    if (!value || /^\d{10}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid phone number");
  };

  const validateEmail = (rule, value) => {
    if (!value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid email");
  };

  // const onChangeDate = (date, dateString) => {
  //   setDateString(dateString)
  // };

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Hãy điều đầy đủ",
              },
            ]}
          >
            <Input size="large" placeholder="Họ" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "Hãy điều đầy đủ",
              },
            ]}
          >
            <Input size="large" placeholder="Tên" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={8}>
          <Form.Item
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
              value=""
              options={[
                { value: "MALE", label: "Nam" },
                { value: "FEMALE", label: "Nữ" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={16}>
          {/* TODO */}
          <Form.Item
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
              onChange={onChangeDate}
              style={{ width: "100%" }}
              placeholder="Ngày sinh"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            name="location"
            rules={[
              {
                required: true,
                message: "Hãy điền đầy đủ",
              },
            ]}
          >
            <Input size="large" placeholder="Tỉnh" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Không tồn tại số này",
                validator: validatePhoneNumber,
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Email không xác định",
                validator: validateEmail,
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Hãy điền đầy đủ",
              },
            ]}
          >
            <Input.Password size="large" placeholder="Mật khẩu" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Xác nhận lại mật khẩu",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu không trùng khớp!");
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Xác nhận mật khẩu" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
