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
  message
} from "antd";
import { useEffect, useState, useContext } from "react";
import AppContext from "@/components/AppContext";
import { useRouter } from "next/router";
import axios from "axios";
import dayjs from "dayjs";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

export default function PostingDetail() {
  const [form] = Form.useForm();
  const router = useRouter();
  const postingId = router.query.postingId;
  const dateFormat = "YYYY-MM-DD";
  const { token, setToken } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [descriptionJob, setDescriptionJob] = useState("");
  const [dateString, setDateString] = useState("");
  const [status, setStatus] = useState(true);

  const onChangeDate = (date, dateString) => {
    setDateString(dateString);
  };

  const setFormData = (job) => {
    console.log(job);
    setDateString(job?.deadline);
    form.setFieldsValue({
      address: job?.address,
      deadline: dayjs(job?.deadline),
      age: job?.age,
      jobName: job?.jobName,
      gender: job?.gender,
      salary: job?.salary,
      experience: job?.experience,
      degree: job?.degree,
      career: job?.career,
      level: job?.level,
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
        "content-type": "application/json",
      },
    };
    axios
      .get(`${URL}/api/v1/company/job`, config)
      .then((res) => {
        const job = res.data.find((job) => job.id === 1);
        setData(job);
        setFormData(job);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onFinish = (values) => {
    values.deadline = dateString;
    values.jobDescription = descriptionJob;
    values.image = "img";
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
      .put(`${URL}/api/v1/company/job/${postingId}`, values, config)
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
      <Form
        form={form}
        initialValues={{
          remember: true,
          // ...data,
        }}
        onFinish={onFinish}
      >
        <h1>Bài đăng ký tuyển dụng {postingId}</h1>
        <Row>
          <h3>Thông tin vị trí</h3>
        </Row>
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
            <RichTextEditor
              initialValue={data?.jobDescription}
              getValue={setDescriptionJob}
            />
          </Col>
        </Row>
        {/* Keep it */}

        <Row style={{ marginTop: "2rem" }}>
          <Divider>
            <Button type="primary" size="large" htmlType="submit">
              Lưu chỉnh sửa
            </Button>
          </Divider>
        </Row>
      </Form>
    </main>
  );
}

PostingDetail.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderOwner>{page}</SiderOwner>
    </>
  );
};
