import ListOfJobInCompany from "@/components/ListOfJobInCompany";
import SiderOwner from "@/components/SiderOwner";
import AppContext from "@/components/AppContext";
import { Row, Col } from "antd";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_HOSTNAME;

export default function Preview() {
  const { token, setToken } = useContext(AppContext);
  const [company, setCompany] = useState({})
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    let tokenResponse
    if (token === "") {
      tokenResponse = window.localStorage.getItem('token')
      setToken(window.localStorage.getItem('token'))
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
      .get(`${URL}/api/v1/company/job`, config)
      .then((res) => {
        setJobs(res.data)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // Infocompany
    axios.get(`${URL}/api/v1/company`, config)
    .then((res) => {
      setCompany(res.data)
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <main>
      <div className="flex m-3 p-3 bg-[#F2F9FD]">
        <div className="bg-white mr-9 flex justify-center items-center w-[178px]">
          <img
            className="object-contain w-full"
            src={company?.companyLogo}
          />
        </div>
        <div>
          <h2>{company?.companyName}</h2>
          <h3>Địa chỉ: {company?.user?.location}</h3>
          <h3>
            <span>Website: </span><a href={company?.companyWebsite} target="_blank">{company?.companyWebsite}</a>
          </h3>
        </div>
      </div>
      <Row className="mb-5">
        <h1>Giới thiệu công ty</h1>
        <Col span={24}>
          <div dangerouslySetInnerHTML={{ __html: company?.companyDescription }} />
        </Col>
      </Row>
      <Row className="mb-5">
        <h1>Liên hệ</h1>
        <Col span={24}>
          <h4>Người liên hệ: {company?.user?.lastName} {company?.user?.firstName}</h4>
          <h4>Email: {company?.user?.email}</h4>
        </Col>
      </Row>
      <Row>
        <h1>Hình ảnh công ty</h1>
        <Col span={24}>
          <img className="max-h-[300px] max-w-[200px]" src={company?.companyImage} />
        </Col>
      </Row>
      <Row>
        <h1>Việc làm đang tuyển</h1>
        <Col span={24}></Col>
      </Row>
      {
        jobs.map((job, index) => <ListOfJobInCompany job={job}/>)
      }
    </main>
  );
}

Preview.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderOwner>{page}</SiderOwner>
    </>
  );
};
 