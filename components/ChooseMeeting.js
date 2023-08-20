import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Col, Row, Tag, Table, Space, message } from 'antd';
import AppContext from "@/components/AppContext";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

export default function ChooseMeeting({ open, close, jobID, newData, setNewData, jobApp }) {
  const { token, setToken } = useContext(AppContext);
  console.log(jobID);
  const [modalText, setModalText] = useState('Content of the modal');
  const [data, setData] = useState([])
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Bắt đầu",
      key: "timeStart",
      dataIndex: "timeStart",
    },
    {
      title: "Kết thúc",
      key: "timeFinish",
      dataIndex: "timeFinish",
    },
    {
      title: "Link",
      key: "link",
      dataIndex: "link",
    },
    {
      title: "Miêu tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <a onClick={() => 
          {
            addInterView(record.id)
          }
        }>Chọn lịch</a>
      ),
    },
  ];

  const changeStatus = () => {
    const configtwo = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `${URL}/api/v1/jobApplication/editStatus?id=${jobApp}&status=3`,
        {},
        configtwo
      )
      .then((respon) => {
        message.success("Thay doi trang thai")
        console.log(respon.data);
        setNewData(!newData)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addInterView = (meetingId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
    .put(`${URL}/api/v1/candidate/jobApplication/addInterview?interviewId=${meetingId}&id=${jobApp}`, {}, config)
      .then((res) => {
        message.success("Thanh cong")
        console.log(res.data);
        changeStatus()
      })
      .catch((err) => {
        console.log(err);
      });
    close()
  }

  useEffect(() => {
    let tokenResponse;
    if (token === "") {
      tokenResponse = window.localStorage.getItem("tokenCandidate");
      setToken(window.localStorage.getItem("tokenCandidate"));
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
      .get(`${URL}/api/v1/interview?jobId=${jobID}`, config)
      .then((res) => {
        setData(res.data)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[jobID])
  return (
    <>
      <Modal
        title="Danh sách meeting"
        open={open}
        onOk={close}
        onCancel={close}
        width={1000}
      >
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

