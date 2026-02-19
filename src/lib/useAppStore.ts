import { create } from "zustand";
import type { Profile } from "./api";

interface AppStore {
  currentScreen: string;
  chatPartnerId: string | null;
  setScreen: (screen: string) => void;
  openChat: (partnerId: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentScreen: "home",
  chatPartnerId: null,
  setScreen: (screen) => set({ currentScreen: screen }),
  openChat: (partnerId) => set({ currentScreen: "chat", chatPartnerId: partnerId }),
}));
