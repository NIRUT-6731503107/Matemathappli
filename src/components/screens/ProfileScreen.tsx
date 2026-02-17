import { useAppStore } from "@/lib/useAppStore";
import { INTEREST_LABELS } from "@/lib/appState";
import BottomNav from "@/components/BottomNav";

export default function ProfileScreen() {
  const { currentUser, selectedInterests, matches, savedMatches, setScreen } = useAppStore();

  if (!currentUser) return null;

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 flex items-center">
        <button onClick={() => setScreen("home")} className="text-2xl text-foreground bg-transparent border-none cursor-pointer mr-4">
          ←
        </button>
        <span className="flex-1 text-foreground text-sm">My Profile</span>
        <button onClick={() => setScreen("settings")} className="text-2xl bg-transparent border-none cursor-pointer">
          ⚙️
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5">
        <div className="w-[150px] h-[150px] rounded-full gradient-avatar mx-auto mb-5 flex items-center justify-center text-6xl">
          👨
        </div>
        <div className="text-[28px] font-bold text-foreground text-center mb-1">{currentUser.name}</div>
        <div className="text-sm text-muted-foreground text-center mb-5">
          {currentUser.year} • Student ID: {currentUser.studentId}
        </div>

        <div className="my-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-foreground text-base">My Interests</span>
            <button onClick={() => setScreen("interests")} className="text-xl bg-transparent border-none cursor-pointer">✏️</button>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {selectedInterests.map((i) => (
              <div key={i} className="px-4 py-2 rounded-full text-sm bg-primary/20 text-primary">
                {INTEREST_LABELS[i] || i} ✓
              </div>
            ))}
          </div>
        </div>

        <div className="my-8">
          <div className="text-foreground text-base mb-2">Saved Matches</div>
          <div className="text-sm text-muted-foreground">{savedMatches.length} saved matches</div>
        </div>

        <div className="my-8">
          <div className="text-foreground text-base mb-4">Statistics</div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Matches", value: matches.length },
              { label: "Saved", value: savedMatches.length },
              { label: "Interests", value: selectedInterests.length },
            ].map((stat) => (
              <div key={stat.label} className="bg-card p-4 rounded-[10px] text-center">
                <div className="text-primary text-2xl font-bold">{stat.value}</div>
                <div className="text-muted-foreground text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
