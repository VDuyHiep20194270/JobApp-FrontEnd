import { Col, Row, Input, Button, Divider, Form, Table, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Link from "next/link";
import SiderCandidate from "@/components/SiderCandidate";

function Password() {
  const [form] = Form.useForm();
  const [passwordBefore, setPasswordBefore] = useState("");
  const [passwordAfter, setPasswordAfter] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
    console.log("Received values of form: ", values);
  };
  const submit = () => {
    if (passwordAfter === passwordConfirm) {
      alert("Chuan r");
    } else {
      alert("Khac roi");
    }
  };
  return (
    <main>
      <h1>Thay đổi mật khẩu</h1>
      <Form
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Row gutter={10}>
          <Col span={16}>
            <Form.Item
              labelCol={{ span: 7 }}
              label="Email"
              name="email"
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
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item
              labelCol={{ span: 7 }}
              label="Mật khẩu cũ"
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: "Hãy điền đầy đủ",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item
              labelCol={{ span: 7 }}
              label="Mật khẩu mới"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Hãy điền đầy đủ",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item
              labelCol={{ span: 7 }}
              name="confirm"
              label="Xác nhận lại mật khẩu"
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
              <Input.Password size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Divider style={{ marginTop: "30px" }}>
              <Button
                htmlType="submit"
                style={{ minWidth: "200px" }}
                type="primary"
                size="large"
                icon={<PlusOutlined />}
              >
                Lưu
              </Button>
            </Divider>
          </Col>
        </Row>
      </Form>
    </main>
  );
}

export default Password;

Password.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderCandidate>{page}</SiderCandidate>
    </>
  );
};
