import SiderOwner from "@/components/SiderOwner";
import RichTextEditor from "@/components/RichTextEditor";
import { Form, Row, Col, Input, Divider, Button, message } from "antd";
import { useState, useContext, useEffect } from "react";
import UploadAvatar from "@/components/UpLoadAvatar";
import UploadImages from "@/components/UploadImages";
import AppContext from "@/components/AppContext";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

export default function Company() {
  const [form] = Form.useForm();
  const { token, setToken } = useContext(AppContext);
  const [value, setValue] = useState("");
  const [avatar, setAvatar] = useState([])
  const [company, setCompany] = useState([])
  const [image, setImage] = useState([]);

  const updateListOfLink = (newArray) => {
    setListOfLink(newArray);
  }

  const setFormData = (company) => {
    setAvatar(company?.companyLogo)
    setImage(company?.companyImage)
    form.setFieldsValue({
      companyDescription: company?.companyDescription,
      companyImage: company?.companyImage,
      companyLogo: company?.companyLogo,
      companyName: company?.companyName,
      companyWebsite: company?.companyWebsite,
    });
  };

  const onFinish = (values) => {
    console.log(value);
    values.companyDescription = value;
    values.companyImage = image;
    values.companyLogo = avatar;
    console.log("Received values of form: ", values);
    let tokenResponse
    if (token === "") {
      tokenResponse = window.localStorage.getItem('token')
      setToken(window.localStorage.getItem('token'))
    } else {
      tokenResponse = token
    }
    const config = {
      headers: { 
        Authorization: `Bearer ${tokenResponse}`,
        'content-type': 'application/json',
      }
    }
    axios
      .put(`${URL}/api/v1/company`, values, config)
      .then((res) => {
        message.success('Update successfully');
        console.log(res.data);
      })
      .catch((err) => {
        message.error(`${err}`);
        console.log(err);
      });
  };

  useEffect( () => {
    let tokenResponse
    if (token === "") {
      tokenResponse = window.localStorage.getItem('token')
      setToken(window.localStorage.getItem('token'))
    } else {
      tokenResponse = token
    }
    const config = {
      headers: { 
        Authorization: `Bearer ${tokenResponse}`,
        'content-type': 'text/json',
      }
    }
    axios.get(`${URL}/api/v1/company`, config)
    .then((res) => {
      setCompany(res.data)
      setFormData(res.data)
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <main>
      <h1 className="mb-9">Thông tin công ty</h1>
      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col span={12}>
            <Form.Item
              name="companyName"
              label="Tên công ty"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="companyWebsite"
              label="Website"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="province"
              label="Tỉnh"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Input size="large" />
            </Form.Item>
            <Row></Row>
          </Col>
          <Col span={12}>
            <UploadAvatar getAvatar={setAvatar} preAvatar={avatar} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h3>Giới thiệu về công ty</h3>
            <Form.Item
              name="companyDescription"
            >
              <RichTextEditor initialValue={company.companyDescription} getValue={setValue}/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <UploadAvatar getAvatar={setImage} preAvatar={image} />
            {/* <UploadImages updateListOfLink={updateListOfLink} listOfLink={listOfLink}/> */}
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
    </main>
  )
}

Company.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderOwner>
        {page}
      </SiderOwner>
    </>
  )
}