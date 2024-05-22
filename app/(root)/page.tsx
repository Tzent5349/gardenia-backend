"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <main>
      Hello from the main dashboardPage
      {/* {router.push("/dashboard")} */}
      <Link href="/dashboard/"> Click me</Link>
    </main>
  );
}
