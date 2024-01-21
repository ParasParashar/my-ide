import { cn } from "@/lib/utils";
import { File } from "lucide-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import DropDownEdit from "./DropDownEdit";
import { deleteFile, editFileName } from "@/actions/folder";
import { useRouter } from "next/navigation";
import useFileSelectionStore from "@/hooks/useFileSelectionStore";
import { useRefresh } from "@/hooks/useRefreshFolder";

type props = {
  name: string;
  id: string;
  mainFolderId: string;
  rootFolderId: string;
};
const FileCard = ({ name, id, mainFolderId, rootFolderId }: props) => {
  const router = useRouter();
  const [isEditName, setIsEditName] = useState(false);
  const [newName, setnewName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const { addSelectedFile, removeSelectedFile } = useFileSelectionStore();

  const onKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await editFileName(id, newName);
      setIsEditName(false);
    }
  };
  const handleDeleteFile = async (id: string) => {
    await deleteFile(id, mainFolderId);
    removeSelectedFile(rootFolderId, id);
  };

  const handleNameInputEnable = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setnewName(newName);
    setIsEditName(true);
  };

  const handleClick = () => {
    addSelectedFile(rootFolderId, { id: id, name: name });
    router.push(`/${rootFolderId}/${id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: React.MouseEvent | MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsEditName(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEditName]);
  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex px-1 group/file relative  transition-all duration-200 ease-in-out  flex-1 w-full justify-between  hover:bg-[#193549] items-center  cursor-pointer pl-2"
      )}
    >
      <span className="p-2 gap-x-2 flex items-center w-full ">
        <File size={20} />

        {isEditName ? (
          <input
            ref={inputRef}
            autoFocus
            value={newName}
            onChange={(e) => setnewName(e.target.value)}
            onKeyDown={onKeyDown}
            className=" bg-transparent text-blue-600  w-full  border  outline-none "
          />
        ) : (
          <p className=" text-ellipsis  text-nowrap text-sm  font-semibold">
            {newName}
          </p>
        )}
      </span>
      <div className="hidden  group-hover/file:block">
        <DropDownEdit
          handleDelete={() => handleDeleteFile(id)}
          handleEdit={(e) => {
            handleNameInputEnable(e);
          }}
        >
          <Button size={"icon2"} variant={"transpairent"}>
            <HiOutlineDotsVertical size={20} />
          </Button>
        </DropDownEdit>
      </div>
    </div>
  );
};

export default FileCard;
