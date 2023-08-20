import SiderCandidate from "@/components/SiderCandidate";
import {
  Col,
  Row,
  Input,
  Button,
  Divider,
  Space,
  Table,
  Form,
  Modal,
  Select,
  DatePicker,
  Popconfirm,
} from "antd";
import AppContext from "@/components/AppContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ChooseMeeting from "@/components/ChooseMeeting";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

export default function Apply() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { token, setToken } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [jobID, setJobID] = useState();
  const [jobAppID, setJobAppID] = useState();
  const [showChooseMeeting, setShowChooseMeeting] = useState(false);
  const [newData, setNewData] = useState(false);
  const [openFeedBack, setOpenFeedBack] = useState(false);
  const [feedBack, setFeedBack] = useState("");

  useEffect(() => {
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
      },
    };
    // JOBS
    axios
      .get(`${URL}/api/v1/candidate/jobApplication`, config)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newData]);

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (_, record) => <b>{record.id}</b>,
    },
    {
      title: "Vị trí",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <p>{record.job.jobName}</p>,
    },
    {
      title: "Mức lương",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <p>{record.job.salary}</p>,
    },
    {
      title: "Hạn",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <p>{record.job.deadline}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.status === 1 && <p className="text-gray-400">Đã ứng tuyển</p>}
          {record.status === 2 && (
            <a
              className="text-green-500"
              onClick={() => {
                setJobID(record.job.id);
                setJobAppID(record.id);
                setShowChooseMeeting(true);
              }}
            >
              Chọn lịch phỏng vấn
            </a>
          )}
          {record.status === 3 && <p className="text-gray-600">Đã chọn lịch</p>}
          {record.status === 4 && <p className="text-gray-500">Đợi phản hồi</p>}
          {record.status === 5 && (
            <div className="flex gap-x-4">
              <p className="text-green-500">Bạn đã được tuyển</p>
              <a
                onClick={() => {
                  setFeedBack(record.feedBack);
                  setOpenFeedBack(true);
                }}
              >
                View feedback
              </a>
            </div>
          )}
          {record.status === 6 && <a className="text-red-500">Bị từ chối</a>}
        </Space>
      ),
    },
  ];

  return (
    <main>
      <ChooseMeeting
        open={showChooseMeeting}
        jobID={jobID}
        jobApp={jobAppID}
        close={() => setShowChooseMeeting(false)}
        newData={newData}
        setNewData={setNewData}
      />
      <h1>Danh sách ứng tuyển</h1>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
      <Modal
        title="FeedBack"
        open={openFeedBack}
        // onOk={handleOk}
        footer={null}
        onCancel={() => {
          setOpenFeedBack(false);
        }}
      >
        <p>{feedBack}</p>
      </Modal>
    </main>
  );
}

Apply.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderCandidate>{page}</SiderCandidate>
    </>
  );
};
