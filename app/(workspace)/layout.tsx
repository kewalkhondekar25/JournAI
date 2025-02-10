import { UserButton } from "@clerk/nextjs";
import React from "react";

const WorkspaceLayout = ({ children }: { children: React.ReactNode}) => {
  return(
    <section className="h-screen w-screen relative">
      <aside className="h-full w-[250px] absolute top-0 left-0 border-r border-black/10 ">
        JournAI
      </aside>
      <div className="ml-[250px]">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-5 flex items-center justify-end">
            <UserButton/>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </section>
  )
}

export default WorkspaceLayout;