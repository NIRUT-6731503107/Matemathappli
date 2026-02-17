import { useState } from "react";
import { useAppStore } from "@/lib/useAppStore";
import BottomNav from "@/components/BottomNav";

const FILTER_CHIPS = ["Freshmen", "Computer Science", "Engineering", "Sophomores"];
const INTEREST_CHIPS = ["Art", "Sports", "Study Habits", "Mobile Dev"];

export default function SearchScreen() {
  const { setScreen } = useAppStore();
  const [activeFilters, setActiveFilters] = useState<string[]>(["Freshmen"]);
  const [activeInterests, setActiveInterests] = useState<string[]>(["Study Habits"]);

  const toggleChip = (chip: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(chip) ? list.filter((c) => c !== chip) : [...list, chip]);
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Search</h1>
          <span className="text-sm text-muted-foreground">5:30 PM</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5">
        <div className="flex items-center bg-card rounded-[10px] px-4 py-3 mb-4">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search for students..."
            className="flex-1 bg-transparent border-none text-foreground text-base outline-none ml-2.5 placeholder:text-muted-foreground"
          />
          <button className="bg-primary border-none text-primary-foreground px-3 py-2 rounded-md cursor-pointer">
            🔍
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5 mb-5">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => toggleChip(chip, activeFilters, setActiveFilters)}
              className={`px-4 py-2 rounded-full text-sm border-none cursor-pointer transition-colors ${
                activeFilters.includes(chip)
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-2.5">Filter by Interests</p>
        <div className="flex flex-wrap gap-2.5 mb-5">
          {INTEREST_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => toggleChip(chip, activeInterests, setActiveInterests)}
              className={`px-4 py-2 rounded-full text-sm border-none cursor-pointer transition-colors ${
                activeInterests.includes(chip)
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        <button
          onClick={() => setScreen("home")}
          className="w-full p-4 bg-primary text-primary-foreground border-none rounded-[10px] text-base font-bold cursor-pointer hover:opacity-90 transition-opacity"
        >
          Apply Filters
        </button>

        <p className="text-sm text-muted-foreground mt-8 mb-2.5">Recent Searches</p>
        <div
          className="bg-card rounded-[20px] p-5 cursor-pointer"
          onClick={() => setScreen("profile")}
        >
          <div className="flex items-center gap-4">
            <div className="w-[50px] h-[50px] rounded-full gradient-avatar flex items-center justify-center text-2xl">
              👩
            </div>
            <div className="flex-1 text-left">
              <div className="text-foreground text-base font-bold">Lily</div>
              <div className="text-sm text-muted-foreground">Computer Science</div>
            </div>
            <div className="text-primary text-xl font-bold">92%</div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
