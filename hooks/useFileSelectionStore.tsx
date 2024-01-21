import { create } from "zustand";

interface FileSelectionState {
  selectedFiles: Record<string, { id: string; name: string }[]>;
  addSelectedFile: (
    rootFolderId: string,
    file: { id: string; name: string }
  ) => void;
  removeSelectedFile: (rootFolderId: string, fileId: string) => void;
  clearSelectedFiles: (rootFolderId: string) => void;
}

const useFileSelectionStore = create<FileSelectionState>((set) => ({
  selectedFiles: {},
  addSelectedFile: (rootFolderId, file) =>
    set((state) => {
      const existingFile = state.selectedFiles[rootFolderId] || [];
      const isDuplicate = existingFile.some((f) => file.id === f.id);
      if (!isDuplicate) {
        return {
          selectedFiles: {
            ...state.selectedFiles,
            [rootFolderId]: [...existingFile, file],
          },
        };
      }
      return state;
    }),
  removeSelectedFile: (rootFolderId, fileId) =>
    set((state) => ({
      selectedFiles: {
        ...state.selectedFiles,
        [rootFolderId]:
          state.selectedFiles[rootFolderId]?.filter((f) => f.id !== fileId) ||
          [],
      },
    })),
  clearSelectedFiles: (rootFolderId) =>
    set((state) => ({
      selectedFiles: {
        ...state.selectedFiles,
        [rootFolderId]: [],
      },
    })),
}));

export default useFileSelectionStore;
