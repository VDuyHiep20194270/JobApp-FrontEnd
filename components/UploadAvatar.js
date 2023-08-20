import { Upload, message, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
// import { uploadImage } from "./Helper"

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

export default function UploadAvatar({ getAvatar, preAvatar }) {
  const [url, setUrl] = useState('');
  const [fileList, setFileList] = useState([]);
  const uploadImage = (i) => {
    const data = new FormData();
    data.append("file", i);
    data.append("upload_preset", "b2fhcmkr");
    data.append("cloud_name", "dtsfilp19");
    fetch("https://api.cloudinary.com/v1_1/dtsfilp19/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        getAvatar(data.url);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = async (info) => {
    const isJpgOrPng =
      info.file.type === "image/jpeg" || info.file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return;
    }
    const isLt2M = info.file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return;
    }
    uploadImage(info.file.originFileObj);
    setFileList([info.fileList[info.fileList.length - 1]]);
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
    if (!info.file.url && !info.file.preview) {
      info.file.preview = await getBase64(info.file.originFileObj);
    }
  };

  return (
    <>
      <Upload
        customRequest={dummyRequest}
        fileList={fileList}
        onChange={handleChange}
      >
        <Button>
          <InboxOutlined /> Chọn ảnh
        </Button>
      </Upload>
      {fileList.length > 0 && (
        <img
          className="max-h-36"
          src={URL.createObjectURL(fileList[0].originFileObj) || preAvatar}
          alt="avatar"
        />
      )}
      {
        fileList.length === 0 && (
          <img
          className="max-h-36"
          src={preAvatar}
          alt="avatar"
        />
        )
      }
    </>
  );
}
