import { create } from "zustand";

interface SideBarState {
  sidebarOpen: boolean;
  toggleSideBar: () => void;
}

export const useSideBar = create<SideBarState>((set) => ({
  sidebarOpen: false,
  toggleSideBar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
