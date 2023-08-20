import { Button, Modal, Row, Col, Divider, Form, Input, message } from "antd";
import { useContext, useEffect, useState } from "react";
import AppContext from "@/components/AppContext";
import axios from "axios";

const { TextArea } = Input;

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

const CreateApplication = ({ open, close, jobID }) => {
  const [form] = Form.useForm();
  const { token, setToken } = useContext(AppContext);
  const onFinish = (values) => {
    console.log(values);
    let tokenResponse;
    if (token === "") {
      tokenResponse = window.localStorage.getItem("tokenCandidate");
      setToken(window.localStorage.getItem("tokenCandidate"));
    } else {
      tokenResponse = token;
    }
    console.log(tokenResponse);
    const config = {
      headers: {
        Authorization: `Bearer ${tokenResponse}`,
        "content-type": "application/json",
      },
    };
    axios
      .post(`${URL}/api/v1/candidate/jobApplication?jobId=${jobID}`, values, config)
      .then((res) => {
        message.success("Update successfully");
        console.log(res.data);
      })
      .catch((err) => {
        message.error("Bạn đã ứng tuyển rồi");
        console.log(err);
      });
      close();
  };

  return (
    <>
      <Modal title="Tạo đơn" open={open}  onCancel={close} width={700} footer={null}>
        <Form form={form} onFinish={onFinish}>
          <Row>
            <Col span={24}>
              <Form.Item
                name="cv"
                label="Link CV"
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
                name="experience"
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
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Divider>
              <Button type="primary" htmlType="submit" size="large">
                Lưu
              </Button>
            </Divider>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default CreateApplication;
