import { Button, Form, message, Modal, Select } from "antd";
import { useState } from "react";

const AsynchronouslyCloseModal = ({ open, closeModal }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    const values = form.getFieldsValue();
    console.log("Values: ", values);
    if (values.job === undefined) {
      message.error("Hãy chọn nghề nghiệp trước")
    } else {
      setConfirmLoading(true);
      setTimeout(() => {
        setConfirmLoading(false);
        closeModal();
      }, 2000);
    }
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    closeModal();
  };
  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={(values) => handleOk(values)}
        >
          <h4>Chọn job bạn muốn mời ứng viên</h4>
          <Form.Item
            name="job"
            rules={[
              {
                required: true,
                message: "Hãy điền đầy đủ",
              },
            ]}
          >
            <Select
              className="text-base"
              options={[
                { value: "1#2", label: "FrontEnd 20,000,000-40.000.000$" },
                { value: "1#3", label: "BackEnd 20,000,000-40.000.000$" },
                { value: "1#4", label: "BackEnd 20,000,000-40.000.000$" },
                { value: "1#5", label: "BackEnd 20,000,000-40.000.000$" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AsynchronouslyCloseModal;
