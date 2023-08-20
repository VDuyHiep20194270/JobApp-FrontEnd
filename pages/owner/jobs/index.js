import SiderOwner from "@/components/SiderOwner";
import { Col, Row, Input, Button, Divider, Space, Table, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import CandidateList from "@/components/CandidateList";
import MeetingList from "@/components/MeetingList";
import axios from "axios";
import AppContext from "@/components/AppContext";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

function Jobs() {
  
  const { token, setToken } = useContext(AppContext);
  const [jobID, setJobID] = useState('')
  const [openCandidateList, setOpenCandidateList] = useState(false);
  const [openMeetingList, setOpenMeetingList] = useState(false);
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "1",
    },
    {
      title: "Ngành nghề",
      dataIndex: "jobName",
      key: "2",
    },
    {
      title: "Mức lương",
      dataIndex: "salary",
      key: "3",
    },
    {
      title: "Hạn",
      dataIndex: "deadline",
      key: "4",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/owner/jobs/posting/${record.id}`}>Edit</Link>
          <a onClick={
            () => {
              setJobID(record.id)
              setOpenCandidateList(true)
            }
          }>Candidate list</a>
          <a onClick={
            () => {
              setOpenMeetingList(true)
              setJobID(record.id)
              console.log(record.id);
            }
          }>Meeting list</a>
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
      .get(`${URL}/api/v1/company/job`, config)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <main>
      <MeetingList
        open={openMeetingList}
        close={() => setOpenMeetingList(false)}
        jobID={jobID}
      />
      <CandidateList
        open={openCandidateList}

        close={() => setOpenCandidateList(false)}
        jobID={jobID}
      />
      <Row>
        <Col span={24}>
          <h1>Danh sách đăng tuyển</h1>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
      <Row>
        <Divider>
          <Link href="jobs/posting">
            <Button type="primary" size="large" icon={<PlusOutlined />}>
              Tạo mẫu tuyển dụng
            </Button>
          </Link>
        </Divider>
      </Row>
    </main>
  );
}

export default Jobs;

Jobs.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderOwner>{page}</SiderOwner>
    </>
  );
};
