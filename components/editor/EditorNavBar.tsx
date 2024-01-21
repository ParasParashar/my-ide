"use client";

import { File } from "lucide-react";
import useFileSelectionStore from "@/hooks/useFileSelectionStore";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { RxCross2 } from "react-icons/rx";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type navbarProps = {
  rootFolderId: string;
};

type dataProps = {
  name: string;
  id: string;
};

const EditorNavbar = ({ rootFolderId }: navbarProps) => {
  const router = useRouter();
  const params = useParams();
  const { selectedFiles, removeSelectedFile } = useFileSelectionStore();
  const [data, setdata] = useState<dataProps[]>([]);

  useEffect(() => {
    const existingRoot = selectedFiles.hasOwnProperty(rootFolderId);

    if (existingRoot) {
      const result = selectedFiles[rootFolderId];
      setdata(result);
    }
  }, [rootFolderId, selectedFiles]);

  const handleDelete = (
    e: React.MouseEvent,
    rootId: string,
    fileId: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    removeSelectedFile(rootId, fileId);
    if (params.folderId.length > 1) {
      router.back();
    } else {
      const route = window.location.origin + "/" + rootId;
      router.replace(route);
    }
  };

  const handleClick = (id: string) => {
    router.push(`/${rootFolderId}/${id}`);
  };
  return (
    <nav className="flex  w-full items-center  text-white  overflow-x-auto">
      {data?.map((item) => {
        const active = params.folderId.includes(item.id);
        return (
          <div
            onClick={() => handleClick(item.id)}
            key={item.id}
            className={cn(
              "flex cursor-pointer relative border-r border-[#0e1e2c] gap-x-3 min-w-40 transition-all duration-200 ease-in-out group/card items-center p-2 hover:bg-[#193549]",
              active && "bg-[#193549]"
            )}
          >
            <File size={20} />
            <span className="text-[#3ad90e] text-lg p-1">{item.name}</span>
            <button
              onClick={(e) => handleDelete(e, rootFolderId, item.id)}
              className={cn(
                "hover:bg-[#283844] group-hover/card:block hidden p-1 rounded-lg",
                active && "block"
              )}
            >
              <RxCross2 size={20} className="text-[#aaaaaa]" />
            </button>
            {active && (
              <span className="w-full h-[3px] bg-[#ffc600] absolute bottom-0 left-0 " />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default EditorNavbar;
