import SiderOwner from "@/components/SiderOwner";
import { useRouter } from "next/router";
import { Row, Col } from "antd"

export default function Detail() {
  const router = useRouter();
  const detailId = router.query.detailId;
  return (
    <main>
      Hello job {detailId}
      <div className="flex m-3 p-3 bg-[#F2F9FD]">
        <div className="bg-white mr-9 flex justify-center items-center w-[178px]">
          <img className="object-contain" src="https://images.careerbuilder.vn/employer_folders/lot5/197075/155x155/90012logoxhome.jpg"/>
        </div>
        <div>
          <h2>Company Name</h2>
          <h3>Location</h3>
          <h3>data...</h3>
          <h3>Website: ...</h3>
        </div>
      </div>
      <Row className="mb-5">
        <h1>Mô tả công việc</h1>
        <Col span={24}>
          <h4>Chức danh: </h4>
          <h4>Ngành nghề: </h4>
          <h4>Mức lương: </h4>
          <h4>... dẫn html mô tả</h4>
        </Col>
      </Row>
      <Row className="mb-5">
        <h1>Yêu cầu công việc</h1>
        <Col span={24}>
          <h4>Hạn nộp: </h4>
          <h4>Giới tính: </h4>
          <h4>... dẫn html miêu tả</h4>
        </Col>
      </Row>
    </main>
  )
}

Detail.getLayout = function PageLayout(page) {
  return (
    <>
      <SiderOwner>{page}</SiderOwner>
    </>
  );
};
