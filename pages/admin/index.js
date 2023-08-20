import HeaderAdmin from "@/components/HeaderAdmin";

export default function Admin() {
  return <main>Admin site</main>;
}

Admin.getLayout = function PageLayout(page) {
  return (
    <>
        <HeaderAdmin />
        {page}
    </>
  );
};
