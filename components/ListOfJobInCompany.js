import { Button, Row } from "antd";

export default function ListOfJobInCompany({ job }) {
  console.log(job);
  return(
    <>
      <div className="flex border-y border-x-0 border-[#D9D9D9] my-2 mx-4 py-4 border-solid">
        <div className="bg-white mr-9 flex justify-center items-center w-[178px]">
          <img className="object-contain" style={{ width:'inherit' }} src={job?.company.companyLogo}/>
        </div>
        <div className="flex justify-between w-full">
          <div>
            <h3 className="my-2">{job?.jobName} - {job?.career}</h3>
            <Row className="my-1 text-base text-[#8E9094] font-medium">{job?.company?.companyName}</Row>
            <Row className="my-1 text-[#008563] text-base font-medium">{job?.salary}</Row>
            <Row className="my-1 text-base font-medium">{job?.address}</Row>
            <Row className="text-base"><i>Hạn: {job?.deadline}</i></Row>
          </div>
          <div className="flex items-center">
            {/* <Button type="primary" size="large"></Button> */}
          </div>
        </div>
      </div>
    </>
  )
}