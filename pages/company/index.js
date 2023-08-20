import SiderOwner from "@/components/SiderOwner";
import RichTextEditor from "@/components/RichTextEditor";
import { Form, Row, Col, Input, Divider, Button } from "antd";
import { useContext, useState } from "react";
import UploadAvatar from "@/components/UpLoadAvatar";
import UploadImages from "@/components/UploadImages";
import AppContext from "@/components/AppContext";
import SiderCandidate from "@/components/SiderCandidate";

export default function Company() {
  const [form] = Form.useForm();
  const { token, role } = useContext(AppContext);
  const [value, setValue] = useState("");
  const [listUpload, setListUpload] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [listOfLink, setListOfLink] = useState([]);

  const updateListOfLink = (newArray) => {
    setListOfLink(newArray);
  };

  const onFinish = (values) => {
    console.log(listOfLink);
    values.description = value;
    values.companyImages = listOfLink;
    values.avatar = avatar;
    console.log("Received values of form: ", values);
  };

  return (
    <main>
      <h1>Thông tin công ty</h1>
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
              name="link"
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
            <UploadAvatar getAvatar={setAvatar} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h3>Giới thiệu về công ty</h3>
            <Form.Item name="description">
              <RichTextEditor initialValue="" getValue={setValue} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <UploadImages
              updateListOfLink={updateListOfLink}
              listOfLink={listOfLink}
            />
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
  );
}

Company.getLayout = function PageLayout(page) {
  return (
    <>
      
      <SiderCandidate>{page}</SiderCandidate>
    </>
  );
};
