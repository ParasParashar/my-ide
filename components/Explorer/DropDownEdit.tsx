"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import { ConfirmModal } from "../modal/ConfirmModal";
import { FaRegPaste, FaCopy } from "react-icons/fa6";
import { GrCut } from "react-icons/gr";
import { cn } from "@/lib/utils";
import { useCopyId } from "@/hooks/useCopy";

type DropDownProps = {
  children: React.ReactNode;
  handleEdit: (e: React.MouseEvent) => void;
  handleDelete: (e: React.MouseEvent) => void;
  handleCopy?: (e: React.MouseEvent) => void;
  handleCut?: (e: React.MouseEvent) => void;
  handlePaste?: (e: React.MouseEvent) => void;
  type: "editor" | "main";
};

const DropDownEdit: React.FC<DropDownProps> = ({
  children,
  type,
  handleEdit,
  handleDelete,
  handleCopy,
  handleCut,
  handlePaste,
}) => {
  const [open, setOpen] = useState(false);
  const { copiedId } = useCopyId();

  const handleDeleteTrigger = (e: React.MouseEvent) => {
    handleDelete(e);
    setOpen(false);
  };
  const handleChange = (e: React.MouseEvent) => {
    handleEdit(e);
    setOpen(false);
  };

  const handleCutTrigger = (e: React.MouseEvent) => {
    if (handleCut) handleCut(e);
    setOpen(false);
  };

  const handlePasteTrigger = (e: React.MouseEvent) => {
    if (handlePaste) handlePaste(e);
    setOpen(false);
  };
  const handleCopyTrigger = (e: React.MouseEvent) => {
    if (handleCopy) handleCopy(e);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 border-slate-900 z-[100] bg-[#08131b] text-primary-foreground transition-all duration-200 ease-in-out">
        {type === "editor" && (
          <>
            <Button
              variant="transpairent"
              size="sm"
              onClick={handleCopyTrigger}
              className="hover:bg-[#193549] flex w-full justify-between cursor-pointer items-center"
            >
              <FaCopy size={15} />
              Copy
            </Button>
            <Button
              variant="transpairent"
              size="sm"
              onClick={handleCutTrigger}
              className="hover:bg-[#193549] flex w-full justify-between cursor-pointer items-center"
            >
              <GrCut size={15} />
              Cut
            </Button>
            <Button
              variant="transpairent"
              size="sm"
              disabled={copiedId.id === ""}
              onClick={handlePasteTrigger}
              className="hover:bg-[#193549] flex w-full justify-between cursor-pointer items-center"
            >
              <FaRegPaste size={15} />
              Paste
            </Button>
          </>
        )}
        <Button
          variant="transpairent"
          size="sm"
          onClick={handleChange}
          className="hover:bg-[#193549] flex w-full justify-between cursor-pointer items-center"
        >
          <MdEdit size={15} />
          Rename
        </Button>
        <ConfirmModal onclick={handleDeleteTrigger}>
          <Button
            size="sm"
            variant="transpairent"
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
