import { create } from "zustand";
type props = { id: string; type: "isCut" | "isCopy" | undefined };
interface useCopyProps {
  copiedId: props;
  setCopiedId: ({ id, type }: props) => void;
}

export const useCopyId = create<useCopyProps>((set, get) => ({
  copiedId: { id: "", type: undefined },
  setCopiedId: ({ id, type }: props) =>
    set({ copiedId: { id: id, type: type } }),
}));
