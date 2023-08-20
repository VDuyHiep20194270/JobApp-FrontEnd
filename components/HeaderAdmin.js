import Link from "next/link"

export default function HeaderAdmin() {
  return (
    <>
      <h1>Hello! This is header component for admin page</h1>
      <Link href="/owner">Owner</Link>
      <br/>
      <Link href="/admin">admin</Link>
      <br/>
      <Link href="/candidate">candidate</Link>
    </>
  )
}