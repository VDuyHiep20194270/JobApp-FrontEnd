import { Button, Modal, Row, Col, Table, Tag, Space } from "antd";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AppContext from "@/components/AppContext";
import PopUpFeedBack from "./PopUpFeedBack";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

const CandidateList = ({ open, close, jobID }) => {
  const { token, setToken } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState(false)
  const [showFeedBack, setShowFeedBack] = useState(false)
  const [jobAppID, setJobAppID] = useState(0)

  const changeStatus = (status, id) => {
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
      },
    };
    axios
      .put(`${URL}/api/v1/jobApplication/editStatus?id=${id}&status=${status}`, {}, config)
      .then((res) => {
        setNewData(!newData);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (_, index) => (<p>
          {index.id}
        </p>
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (_, index) => (
        <p>
          {index.candidate.user.firstName} {index.candidate.user.lastName}
        </p>
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (_, index) => <p>{index.candidate.user.gender}</p>,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (_, index) => <p>{index.candidate.user.birthDate}</p>,
    },
    {
      title: "Ngành nghề",
      key: "career",
      dataIndex: "career",
      render: (_, index) => <p>{index.candidate.career}</p>,
    },
    {
      title: "CV",
      key: "CV",
      dataIndex: "CV",
      render: (_, index) => (
        <a href={index.cv} target="_blank">
          Link
        </a>
      ),
    },
    {
      title: "Phòng phỏng vấn",
      key: "meeting",
      dataIndex: "meeting",
      render: (_, index) => <p>{index.status}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {
            record.status !== 5 && (
              <a className="text-red-600">Từ chối</a>
            )
          }
          {record.status === 1 && (
            <>
              <a className="text-green-300" 
                onClick={
                  () => 
                  {
                    setJobAppID(record.id)
                    changeStatus(2, record.id)
                  }
                }>Bắt đầu xét tuyển</a>
            </>
          )}
          {record.status === 2 && (
            <>
              <p>Ứng viên đang chọn lịch</p>
            </>
          )}
          {record.status === 3 && (
            <>
              <a className="text-yellow-400"  onClick={
                  () => 
                  {
                    setJobAppID(record.id)
                    changeStatus(4, record.id)
                  }
                }>Tiến hành phỏng vấn</a>
            </>
          )}
          {record.status === 4 && (
            <>
              <a
                className="text-green-400"
                onClick={() => 
                  {
                    setJobAppID(record.id)
                    setShowFeedBack(true)
                  } 
                }
              >Để lại feedback</a>
            </>
          )}
          {record.status === 5 && (
            <>
              <a className="text-green-600">Hoàn thành</a>
            </>
          )}
        </Space>
      ),
    },
  ];

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
      },
    };
    axios
      .get(`${URL}/api/v1/job/jobApplication?jobId=${jobID}`, config)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jobID, newData]);

  return (
    <>
      <PopUpFeedBack
        open={showFeedBack}
        close={() => setShowFeedBack(false)}
        jobAppID={jobAppID}
        setNewData={setNewData}
        newData={newData}
        // changeStatus={changeStatus(5)}
      />
      <Modal
        title="Danh sách ứng tuyển"
        centered
        open={open}
        onOk={close}
        onCancel={close}
        footer={null}
        width={1300}
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
export default CandidateList;
