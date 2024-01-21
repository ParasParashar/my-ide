"use client";

import { File, Folder } from "@prisma/client";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { LuFilePlus2 } from "react-icons/lu";
import { HiOutlineFolderPlus } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { FaAlignLeft } from "react-icons/fa";
import {
  createFileWithinFolder,
  createSubFolderWithinFolder,
} from "@/actions/explorer";
import FileCard from "./FileCard";
import DropDownEdit from "./DropDownEdit";
import { deleteFolderAndSubFolder, editFolderName } from "@/actions/folder";
import { useRouter } from "next/navigation";
import { useRefresh } from "@/hooks/useRefreshFolder";

interface folderCreation {
  folderId: string;
  rootFolderId: string;
  name: string;
  main?: boolean;
  depth?: number;
  childFolders?: Folder[];
  files?: File[];
}
const FolderCreation = ({
  rootFolderId,
  folderId,
  name,
  childFolders,
  files,
  main,
  depth = 0,
}: folderCreation) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropDown, setDropDown] = useState(false);
  const [create, setCreate] = useState("");
  const [newName, setnewName] = useState(name);
  const [isEditName, setIsEditName] = useState(false);
  const [isShow, setIsShow] = useState({
    isFolder: false,
    visible: false,
  });
  const { toggleRefresh } = useRefresh();
  const handleShow = (e: React.MouseEvent, value: boolean) => {
    e.stopPropagation();
    setDropDown(true);
    setIsShow({ ...isShow, visible: true, isFolder: value });
  };
  const handleCreate = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (create.trim() !== "") {
        if (isShow.isFolder) {
          await createSubFolderWithinFolder({
            parentId: folderId,
            name: create,
          });
          setDropDown(true);
        } else {
          await createFileWithinFolder({
            parentId: folderId,
            name: create,
          });
          setDropDown(true);
        }
      }
      setIsShow({ ...isShow, visible: false });
      setCreate("");
      toggleRefresh();
    }
  };

  const handleInputHide = (e: React.MouseEvent<InputEvent>) => {
    e.stopPropagation();
    setIsShow({ ...isShow, visible: false });
  };
  const onKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await editFolderName(folderId, newName);
      setIsEditName(false);
    }
  };

  const handleNameInputEnable = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setnewName(newName);
    setIsEditName(true);
  };
  const handleDeleteFolder = async (id: string) => {
    if (depth === 0) {
      await deleteFolderAndSubFolder(id);
      toggleRefresh();
      router.push("/code");
    } else {
      await deleteFolderAndSubFolder(id, folderId);
      toggleRefresh();
    }
  };

  useEffect(() => {
    const handleChangeName = (e: React.MouseEvent | MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsEditName(false);
      }
    };
    document.addEventListener("click", handleChangeName);
    return () => document.removeEventListener("click", handleChangeName);
  }, [isEditName]);

  return (
    <>
      <div className="flex flex-col relative transition-all animate-accordion-down duration-200 ease-in-out text-gray-200  ">
        <div
          style={{ paddingLeft: depth * 5 + "px" }}
          onClick={() => setDropDown(!dropDown)}
          className={cn(
            "flex overflow-y-auto flex-1 w-full justify-between px-1 group/folder  hover:bg-[#193549] items-center  cursor-pointer transition-all duration-200 ease-in-out",
            main && "bg-[#193549]"
          )}
        >
          <span
            onBlur={() => setIsEditName(false)}
            className=" gap-x-2 flex items-center text-sm  font-semibold  p-2"
          >
            {dropDown ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            {isEditName ? (
              <input
                autoFocus
                ref={inputRef}
                value={newName}
                onChange={(e) => setnewName(e.target.value)}
                onKeyDown={onKeyDown}
                className="bg-transparent  w-full  outline-none text-blue-500 "
              />
            ) : (
              <p className=" text-ellipsis  text-nowrap ">{newName}</p>
            )}
          </span>

          <div
            className={cn(
              " items-center hidden group-hover/folder:flex",
              main && "flex"
            )}
          >
            <Button
              size={"icon2"}
              variant={"transpairent"}
              onClick={(e) => handleShow(e, false)}
            >
              <LuFilePlus2 size={20} />
            </Button>
            <Button
              size={"icon2"}
              variant={"transpairent"}
              onClick={(e) => handleShow(e, true)}
            >
              <HiOutlineFolderPlus size={20} />
            </Button>
            <DropDownEdit
              handleDelete={() => handleDeleteFolder(folderId)}
              handleEdit={(e) => handleNameInputEnable(e)}
            >
              <Button size={"icon2"} variant={"transpairent"}>
                <HiOutlineDotsVertical size={20} />
              </Button>
            </DropDownEdit>
          </div>
        </div>

        {isShow.visible && (
          <div className="flex items-center  transition-all duration-200 ease-in-out gap-x-1">
            {isShow.isFolder ? (
              <ChevronRight size={20} />
            ) : (
              <FaAlignLeft size={18} />
            )}
            <input
              autoFocus
              value={create}
              onChange={(e) => setCreate(e.target.value)}
              className="bg-[#142b3b] border-none outline-none focus-visible:no-underline p-1 text-md w-full shadow-lg  rounded-sm"
              onBlur={(e) => handleInputHide(e)}
              onKeyDown={handleCreate}
            />
          </div>
        )}

        {/* calling sub folder and files */}
        {dropDown && (
          <div
            style={{ paddingLeft: depth * 5 + "px" }}
            className="transition-all duration-200 ease-in-out relative"
          >
            {files?.map((file) => (
              <FileCard
                key={file.id}
                name={file.name}
                id={file.id}
                mainFolderId={folderId}
                rootFolderId={rootFolderId}
              />
            ))}
          </div>
        )}
      </div>

      {dropDown && (
        <div className="transition-all duration-200 ease-in-out">
          {childFolders?.map((folder) => (
            <FolderCreation
              key={folder.id}
              folderId={folder.id}
              rootFolderId={rootFolderId}
              name={folder.name}
              //@ts-ignore
              childFolders={folder?.childFolders}
              //@ts-ignore
              files={folder?.files}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FolderCreation;
