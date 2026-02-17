import { create } from "zustand";
import type { User, MatchedUser } from "./appState";
import { getSuggestedMatches } from "./appState";

interface AppStore {
  currentUser: User | null;
  selectedInterests: string[];
  savedMatches: string[];
  matches: MatchedUser[];
  currentScreen: string;

  login: (studentId: string, name: string, year: string) => void;
  logout: () => void;
  setScreen: (screen: string) => void;
  toggleInterest: (interest: string) => boolean;
  completeInterests: () => void;
  acceptProfile: (userId: string) => void;
  rejectProfile: (userId: string) => void;
  refreshMatches: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  currentUser: null,
  selectedInterests: [],
  savedMatches: [],
  matches: [],
  currentScreen: "login",

  login: (studentId, name, year) => {
    set({
      currentUser: {
        id: studentId,
        name,
        year,
        studentId,
        interests: [],
        avatarEmoji: "👨",
      },
    });
    const state = get();
    if (state.selectedInterests.length === 0) {
      set({ currentScreen: "interests" });
    } else {
      set({ currentScreen: "home" });
      get().refreshMatches();
    }
  },

  logout: () => {
    set({
      currentUser: null,
      selectedInterests: [],
      savedMatches: [],
      matches: [],
      currentScreen: "login",
    });
  },

  setScreen: (screen) => set({ currentScreen: screen }),

  toggleInterest: (interest) => {
    const { selectedInterests } = get();
    if (selectedInterests.includes(interest)) {
      set({ selectedInterests: selectedInterests.filter((i) => i !== interest) });
      return true;
    }
    if (selectedInterests.length >= 5) return false;
    set({ selectedInterests: [...selectedInterests, interest] });
    return true;
  },

  completeInterests: () => {
    set({ currentScreen: "home" });
    get().refreshMatches();
  },

  acceptProfile: (userId) => {
    const { savedMatches, matches } = get();
    set({
      savedMatches: savedMatches.includes(userId)
        ? savedMatches
        : [...savedMatches, userId],
      matches: matches.filter((m) => m.id !== userId),
    });
  },

  rejectProfile: (userId) => {
    set({ matches: get().matches.filter((m) => m.id !== userId) });
  },

  refreshMatches: () => {
    const { currentUser, selectedInterests } = get();
    if (!currentUser) return;
    set({ matches: getSuggestedMatches(currentUser.id, selectedInterests) });
  },
}));
