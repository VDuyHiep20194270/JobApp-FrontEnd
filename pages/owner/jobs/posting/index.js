import SiderOwner from "@/components/SiderOwner";
import RichTextEditor from "@/components/RichTextEditor";
import {
  Col,
  Row,
  Input,
  Button,
  Divider,
  Form,
  Select,
  DatePicker,
  message,
  InputNumber,
} from "antd";
import { useState, useContext } from "react";
import axios from "axios";
import AppContext from "@/components/AppContext";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

function Posting() {
  const dateFormat = "YYYY-MM-DD";
  const [form] = Form.useForm();
  const { token, setToken } = useContext(AppContext);
  const [descriptionJob, setDescriptionJob] = useState("");
  const [jobRequirement, setJobRequirement] = useState("");
  const [dateString, setDateString] = useState("");
  const onChangeDate = (date, dateString) => {
    setDateString(dateString);
  };
  const onFinish = (values) => {
    values.deadline = dateString;
    values.jobDescription = descriptionJob;
    values.age = parseInt(values.age);
    values.salary = parseInt(values.salary);
    values.image = 'img'
    console.log("Received values of form: ", values);
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
      .post(`${URL}/api/v1/company/createJob`, values, config)
      .then((res) => {
        message.success("Tạo job thành công!");
        console.log(res.data);
      })
      .catch((err) => {
        message.error(`${err}`);
        console.log(err);
      });
  };
  return (
    <main>
      <h1>Đăng tuyển dụng</h1>
      <Form
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        {/* <p className="m-0 mr-2">Bạn muốn bài đăng ở chế độ công khai? </p> */}

        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              name="jobName"
              label="Chức danh"
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
              name="career"
              label="Ngành nghề"
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
                value=""
                options={[
                  { value: "MALE", label: "Nam" },
                  { value: "FEMALE", label: "Nữ" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* TODO */}
            <Form.Item
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
              label="Hạn nộp"
              name="deadline"
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
                placeholder=""
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Tỉnh"
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
              name="salary"
              label="Mức lương"
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
        <Row gutter={20}>
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
              name="experience"
              label="Kinh nghiệm"
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
          <Col span={12}>
            <Form.Item
              name="level"
              label="Trình độ"
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
              name="age"
              label="Tuổi"
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

        {/* Keep it */}
        <Row>
          <Col span={24}>
            <h3>Mô tả công việc</h3>
            <RichTextEditor initialValue="" getValue={setDescriptionJob} />
          </Col>
        </Row>
        {/* Keep it */}

        <Row style={{ marginTop: "2rem" }}>
          <Divider>
            <Button type="primary" size="large" htmlType="submit">
              Lưu
            </Button>
          </Divider>
        </Row>
      </Form>
    </main>
  );
}

export default Posting;

Posting.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderOwner>{page}</SiderOwner>
    </>
  );
};
