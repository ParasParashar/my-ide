import { create } from 'zustand'
interface useRefreshProps {
    isRefresh: boolean;
    toggleRefresh: () => void
}

export const useRefresh = create<useRefreshProps>((set, get) => ({
    isRefresh: false,
    toggleRefresh: () => set({ isRefresh: !get().isRefresh })
}))
