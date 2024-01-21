"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { HiDotsVertical } from "react-icons/hi";

import { useRef, useState } from "react";
import { deleteFolderAndSubFolder, editFolderName } from "@/actions/folder";
import { ImCross } from "react-icons/im";
import { IoMdCheckmark } from "react-icons/io";
import DropDownEdit from "../Explorer/DropDownEdit";

type props = {
  name: string;
  id: string;
};

const UserFolderCard = ({ name, id }: props) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setisEditing] = useState(false);
  const [newName, setnewName] = useState(name);
  const handleEnable = (e: React.MouseEvent) => {
    e.stopPropagation();
    setnewName(newName);
    setisEditing(true);
    inputRef.current?.focus();
  };
  const disabelInput = () => {
    setisEditing(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
      disabelInput();
    }
  };

  const handleSave = async () => {
    if (newName.trim() === "") return;
    await editFolderName(id, newName);
    disabelInput();
  };
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteFolderAndSubFolder(id, "/code");
  };

  return (
    <section
      className="w-auto max-w-[500px] cursor-pointer flex justify-between items-center  border border-[#3b3a3a] p-5 rounded-xl
  text-3xl sm:text-4xl font-serif font-semibold text-primary-foreground  backdrop-blur-lg  shadow-xl hover:bg-[#0c0c21]  transition-all"
    >
      <div className="flex flex-col w-full">
        {isEditing ? (
          <div className="flex items-center w-full">
            <input
              ref={inputRef}
              autoFocus
              value={newName}
              onChange={(e) => setnewName(e.target.value)}
              onClick={handleEnable}
              onKeyDown={onKeyDown}
              className="bg-transparent  border-b p-2  outline-none text-lg flex-grow-1"
            />
            <ImCross
              onClick={disabelInput}
              className="text-red-500"
              size={14}
            />
            <Button
              onClick={handleSave}
              className="ml-2"
              variant={"transpairent"}
              size="sm"
            >
              <IoMdCheckmark size={15} className="text-secondary" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span
              onClick={() => router.push(`/${id}`)}
              className=" text-ellipsis drop-shadow-2xl"
            >
              {newName}
            </span>
            <DropDownEdit handleDelete={handleDelete} handleEdit={handleEnable}>
              <Button variant={"transpairent"} size={"icon"}>
                <HiDotsVertical size={20} className=" text-gray-200" />
              </Button>
            </DropDownEdit>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserFolderCard;
