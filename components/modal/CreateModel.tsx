"use client";
import { createFolder } from "@/actions/folder";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Span } from "next/dist/trace";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
export function CreateModel({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("");
  const router = useRouter();
  const onSubmit = async () => {
    if (name.trim() !== "") {
      await createFolder(name).then((data) => router.push(`/${data}`));
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-neutral-950 z-[99999]">
        <DialogHeader>
          <DialogTitle className="text-secondary">Create Folder</DialogTitle>
          <DialogDescription>
            Create folder and you can add and edit it later if you want.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-between space-x-2 w-full"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-1 text-secondary rounded-lg w-full text-lg bg-black"
            type="text"
            autoFocus
            placeholder="Enter name"
          />

          <Button
            type="submit"
            variant="secondary"
            size="sm"
            disabled={name.length === 0}
            className="px-3"
          >
            Create
          </Button>
        </form>
        {name.length === 0 && (
          <span className="text-red-500 text-sm">
            Name can&apos;t be empty.
          </span>
        )}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
