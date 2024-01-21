import { getMainFolder } from "@/actions/folder";
import CodeRouteNavbar from "@/components/customs/CodeRouteNavbar";
import EditorSideBar from "@/components/editor/EditorSideBar";
import Test from "@/components/editor/Test";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full editorBg ">
      <CodeRouteNavbar />
      <main className="h-full w-full overflow-hidden flex">
        <EditorSideBar />
        {children}
      </main>
    </div>
  );
};

export default EditorLayout;
