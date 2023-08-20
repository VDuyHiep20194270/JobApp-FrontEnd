import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Col, Row, message, Form, Input, Divider } from "antd";
import AppContext from "@/components/AppContext";
import axios from "axios";

const { TextArea } = Input;

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

export default function PopUpFeedBack({
  open,
  close,
  jobAppID,
  newData,
  setNewData,
}) {
  const [form] = Form.useForm();
  const { token, setToken } = useContext(AppContext);
  const [value, setValue] = useState("");
  const [modalText, setModalText] = useState("Content of the modal");
  const [data, setData] = useState([]);
  const [accept, setAccept] = useState(true);

  const changeStatus = () => {
    const configtwo = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let endProcess = 0;
    if (accept) {
      endProcess = 5
    } else {
      endProcess = 6
    }
    axios
      .put(
        `${URL}/api/v1/jobApplication/editStatus?id=${jobAppID}&status=${endProcess}`,
        {},
        configtwo
      )
      .then((respon) => {
        setNewData(!newData);
        console.log(respon.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onFinish = (values) => {
    let tokenResponse;
    if (token === "") {
      tokenResponse = window.localStorage.getItem("token");
      setToken(window.localStorage.getItem("token"));
    } else {
      tokenResponse = token;
    }
    console.log(tokenResponse);
   
    const config = {
      headers: {
        Authorization: `Bearer ${tokenResponse}`,
        "content-type": "text/plain",
      },
    };
    axios
      .put(
        `${URL}/api/v1/company/jobApplication/createFeedBack?id=${jobAppID}`,
        values.Text,
        config
      )
      .then((res) => {
        message.success("Update successfully");
        changeStatus();
        console.log(res.data);
      
      })
      .catch((err) => {
        message.error("Bạn đã ứng tuyển rồi");
        console.log(err);
      });


    close()
    console.log(values);
  };

  return (
    <>
      <Modal
        title="Để lại FeeBack"
        open={open}
        onOk={close}
        onCancel={close}
        width={600}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Row>
            <Col span={24}>
              <Form.Item
                name="Text"
                rules={[
                  {
                    required: true,
                    message: "Hãy điều đầy đủ",
                  },
                ]}
              >
                <TextArea
                  autoSize={{
                    minRows: 2,
                    maxRows: 6,
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Divider>
              <Button type="primary" htmlType="submit" size="large" onClick={() => setAccept(false)}>
                Từ Chối
              </Button>
            </Divider>
          </Row>
          <Row>
            <Divider>
              <Button type="primary" htmlType="submit" size="large" onClick={() => setAccept(true)}>
                Đồng ý
              </Button>
            </Divider>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
