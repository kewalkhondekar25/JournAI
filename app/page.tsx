import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <div className="text-4xl">Journ AI</div>
        <p>Your AI-powered journaling companion. Write or speak your thoughts, and let AI analyze mood, detect patterns, and provide deep sentiment insights. Track your well-being and uncover your emotional journey effortlessly.</p>
      </div>
    </div>
  );
}
