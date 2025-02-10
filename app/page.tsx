import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {

  const { userId } = await auth();
  const href = userId ? "/dashboard" : "/auth";
  
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black text-white">
      <div className="w-full max-w-[600px] mx-auto text-center">
        <div className="text-4xl">Journ AI</div>
        <p>Your AI-powered journaling companion.</p>
        <Link href={href}>
          <button className="bg-blue-600 p-2 rounded mt-3">Get Started</button>
        </Link>
      </div>
    </div>
  );
}
