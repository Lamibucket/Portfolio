import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
      <Link href="/">Home</Link> |{" "}
      <Link href="/blog">Blog</Link> |{" "}
      <Link href="/Days">Days</Link>
    </nav>
  );
}