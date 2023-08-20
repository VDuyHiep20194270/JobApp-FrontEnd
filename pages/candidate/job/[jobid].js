import ListOfJobInCompany from "@/components/ListOfJobInCompany";
import AppContext from "@/components/AppContext";
import { Row, Col } from "antd";
import { useState, useEffect, useContext} from "react";
import axios from "axios";
import SiderCandidate from "@/components/SiderCandidate";
import { useRouter } from "next/router";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

export default function JobDetail() {
  const { token, setToken } = useContext(AppContext);
  const router = useRouter();
  const jobid = router.query.jobid;
  const [company, setCompany] = useState({})
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    let tokenResponse
    console.log(jobid);
    if (token === "") {
      tokenResponse = window.localStorage.getItem('tokenCandidate')
      setToken(window.localStorage.getItem('tokenCandidate'))
    } else {
      tokenResponse = token
    }
    console.log(tokenResponse);
    const config = {
      headers: { 
        Authorization: `Bearer ${tokenResponse}`,
        'content-type': 'text/json',
      }
    }
    // JOBS
    axios
      .get(`${URL}/api/v1/job/${jobid}`, config)
      .then((res) => {
        setJobs(res.data)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // // Infocompany
    // axios.get(`${URL}/api/v1/company`, config)
    // .then((res) => {
    //   setCompany(res.data)
    //   console.log(res.data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  }, []);

  return (
    <main>
      <div className="flex m-3 p-3 bg-[#F2F9FD]">
        <div className="bg-white mr-9 flex justify-center items-center w-[178px]">
          <img
            className="object-contain w-full"
            src={jobs.company?.companyLogo}
          />
        </div>
        <div>
          <h2>{jobs.company?.companyName}</h2>
          <h3>Địa chỉ: {jobs.company?.user?.location}</h3>
          <h3>
            <span>Website: </span><a href={jobs.company?.companyWebsite} target="_blank">{company?.companyWebsite}</a>
          </h3>
        </div>
      </div>
      <Row className="mb-5">
        <Col span={24}>
          <h1>Giới thiệu công việc</h1>
          <h3>Chức danh: {jobs.jobName} - {jobs.career}</h3>
          <h3>Hạn nộp: {jobs.deadline}</h3>
          <h3>Mức lương: {jobs.salary}</h3>
          <h1>Yêu cầu công việc: </h1>
          <h3>Giới tính: {jobs.gender}</h3>
          <h3>Bằng cấp: {jobs.degree}</h3>
          <h3>Kinh nghiệm: {jobs.experience}</h3>
          <h3>Trình độ: {jobs.level}</h3>
          <h3>Tuổi  : {jobs.age}</h3>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <h1>Mô tả công việc</h1>
          <div dangerouslySetInnerHTML={{ __html: jobs.company?.companyDescription }} />
        </Col>
      </Row>
      <Row className="mb-5">
        <h1>Liên hệ</h1>
        <Col span={24}>
          <h4>Người liên hệ: {jobs.company?.user?.lastName} {jobs.company?.user?.firstName}</h4>
          <h4>Email: {jobs.company?.user?.email}</h4>
        </Col>
      </Row>
      <Row>
        <h1>Hình ảnh công ty</h1>
        <Col span={24}>
          <img className="max-h-[300px] max-w-[200px]" src={jobs.company?.companyImage} />
        </Col>
      </Row>
    </main>
  );
}

JobDetail.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderCandidate>{page}</SiderCandidate>
    </>
  );
};
 