import { useState } from "react";
import { useAppStore } from "@/lib/useAppStore";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Clock } from "lucide-react";

const FILTER_CHIPS = ["All", "Freshmen", "Sophomores", "Juniors"];
const INTEREST_CHIPS = ["🎵 Music", "⚽ Sports", "📚 Study", "🎮 Gaming", "🎨 Art"];

export default function SearchScreen() {
  const { setScreen } = useAppStore();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeInterests, setActiveInterests] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const toggleInterest = (chip: string) => {
    setActiveInterests((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-6 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Discover</h1>
          <button className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center border border-border/50 bg-transparent cursor-pointer">
            <SlidersHorizontal size={16} className="text-muted-foreground" />
          </button>
        </div>
        <div className="relative mb-4">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students, interests..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap border-none cursor-pointer transition-all ${
                activeFilter === chip
                  ? "gradient-primary text-primary-foreground shadow-glow-sm"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <div className="mb-5">
          <p className="text-xs text-muted-foreground mb-2.5 font-medium uppercase tracking-wider">Interests</p>
          <div className="flex flex-wrap gap-2">
            {INTEREST_CHIPS.map((chip) => (
              <motion.button
                key={chip}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleInterest(chip)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border cursor-pointer transition-all ${
                  activeInterests.includes(chip)
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "bg-transparent border-border/50 text-muted-foreground"
                }`}
              >
                {chip}
              </motion.button>
            ))}
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen("home")}
          className="w-full py-3.5 btn-primary text-primary-foreground rounded-2xl text-sm font-bold cursor-pointer mb-6 shadow-glow-sm"
        >
          Apply Filters
        </motion.button>
      </div>
      <BottomNav />
    </div>
  );
}
