"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import { ConfirmModal } from "../modal/ConfirmModal";
import { useState } from "react";

type dropDownProps = {
  children: React.ReactNode;
  handleEdit: (e: React.MouseEvent) => void;
  handleDelete: (e: React.MouseEvent) => void;
};

const DropDownEdit = ({
  children,
  handleEdit,
  handleDelete,
}: dropDownProps) => {
  const [open, setOpen] = useState(false);
  const handleChange = (e: React.MouseEvent) => {
    handleEdit(e);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 border-slate-900  z-[100] bg-[#08131b]  text-primary-foreground">
        <Button
          variant="transpairent"
          size="sm"
          onClick={handleChange}
          className="
          hover:bg-[#193549] 
          flex w-full justify-between cursor-pointer items-center"
        >
          <MdEdit size={15} />
          Rename
        </Button>
        <ConfirmModal onclick={(e) => handleDelete(e)}>
          <Button
            size={"sm"}
            variant={"transpairent"}
            className="flex cursor-pointer w-full hover:bg-[#193549] justify-between items-center"
          >
            <MdDelete size={15} className="text-red-400" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownEdit;
