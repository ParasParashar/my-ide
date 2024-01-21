"use client";

import { cn } from "@/lib/utils";
import { VscFiles } from "react-icons/vsc";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import FolderCreation from "../Explorer/FolderCreation";
import { getMainFolder } from "@/actions/folder";
import { useParams } from "next/navigation";
import { Loader, Loader2 } from "lucide-react";
import { FolderSkeleton } from "../Loaders/FolderSkeleton";
import EditorNavbar from "./EditorNavBar";
import { useRefresh } from "@/hooks/useRefreshFolder";

const EditorSideBar = () => {
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navBarRef = useRef<ElementRef<"div">>(null);
  const [folderData, setFolderData] = useState<any>([]);
  const isResizing = useRef(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [isResetting, setIsresetting] = useState(false);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const folderId = params.folderId[0] as string;
  const { isRefresh } = useRefresh();

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, []);
  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [isMobile]);

  async function getSidebarData(folderId: string) {
    const folderDetails = await getMainFolder(folderId);
    setFolderData(folderDetails);
    setLoading(false);
  }
  useEffect(() => {
    getSidebarData(folderId);
  }, [isRefresh]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return null;
    let newWidth = e.clientX;
    if (newWidth < 200) {
      collapse();
    }
    if (newWidth < 250) {
      newWidth = 250;
    }

    if (newWidth > 750) {
      newWidth = 750;
    }
    if (sidebarRef.current && navBarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navBarRef.current.style.setProperty("left", `${newWidth + 47}px`);
      navBarRef.current.style.setProperty(
        "width",
        `calc(100% -${newWidth + 47}vw)`
      );
    }
  };
  const handleMouseUp = (e: MouseEvent) => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navBarRef.current) {
      setIsresetting(true);
      setShow(false);
      setIsresetting(true);
      sidebarRef.current.style.width = isMobile ? "85vw" : "250px";
      navBarRef.current.style.width = isMobile ? "100%" : "calc(100vw - 297px)";
      navBarRef.current.style.left = isMobile ? "100%" : "297px";

      setTimeout(() => {
        setIsresetting(false);
      }, 400);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navBarRef.current) {
      setIsresetting(true);
      sidebarRef.current.style.width = "0";
      navBarRef.current.style.setProperty("width", "calc(100vw - 47px)");
      navBarRef.current.style.setProperty("left", "47px");
      setTimeout(() => setIsresetting(false), 300);
      setShow(true);
    }
  };
  return (
    <div className="flex relative ">
      <aside className="editorMainSidebarAndNavbar flex flex-col gap-y-3 py-5 p-1  text-white h-full border-r overflow-y-auto">
        <VscFiles
          onClick={show ? resetWidth : collapse}
          className="text-gray-400 font-bold cursor-pointer hover:text-gray-200 active:text-gray-200"
          size={38}
        />
      </aside>
      <aside
        ref={sidebarRef}
        className={cn(
          "relative group/sidebar  w-60 h-full overflow-hidden z-[99] editorSidebar ",
          isMobile && "w-0",
          isResetting && "transition-all ease-in-out  duration-300"
        )}
      >
        {/* content */}
        <div className="flex flex-col  ">
          <div className="p-2 px-5">
            <h3 className="font-serif text-sm  text-[#89aaaa]  font-light">
              EXPLORER
            </h3>
          </div>
          {loading ? (
            // <Loader className=" animate-spin" />
            <FolderSkeleton />
          ) : (
            <div className=" overflow-y-auto h-[600px]  custom-scrollbar ">
              <FolderCreation
                main
                folderId={folderId}
                rootFolderId={folderId}
                name={folderData.name}
                files={folderData.files}
                childFolders={folderData.childFolders}
              />
            </div>
          )}
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="absolute top-0 right-0 h-screen w-1 border-r cursor-e-resize  group-hover/sidebar:bg-sky-500/60 group-hover/sidebar:border-none"
        />
      </aside>

      {/* navbar adustable */}
      <div
        ref={navBarRef}
        className={cn(
          "absolute top-0  text-white z-[99] editorMainSidebarAndNavbar left-[300px] w-[calc(100%-300px)] ",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-[47px] "
        )}
      >
        <EditorNavbar rootFolderId={folderId} />
      </div>
    </div>
  );
};

export default EditorSideBar;
