import { useAppStore } from "@/lib/useAppStore";
import BottomNav from "@/components/BottomNav";

export default function HomeScreen() {
  const { matches, acceptProfile, rejectProfile } = useAppStore();

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-5">
        <h1 className="text-2xl font-bold text-foreground">MateMatch</h1>
        <p className="text-sm text-muted-foreground">Home Screen</p>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        {matches.length === 0 ? (
          <div className="text-foreground text-center py-10">
            No matches found. Try selecting more interests!
          </div>
        ) : (
          matches.map((match) => (
            <div
              key={match.id}
              className="bg-card rounded-[20px] p-8 text-center mb-5 shadow-lg animate-fade-in"
            >
              <div className="w-[150px] h-[150px] rounded-full gradient-avatar mx-auto mb-5 flex items-center justify-center text-6xl text-foreground">
                {match.avatarEmoji}
              </div>
              <div className="text-[28px] font-bold text-foreground mb-1">
                {match.name}
              </div>
              <div className="text-sm text-muted-foreground mb-5">
                {match.year} • {match.major}
              </div>
              <div className="w-[100px] h-[100px] rounded-full bg-primary text-primary-foreground text-[32px] font-bold flex items-center justify-center mx-auto my-5">
                {match.matchScore}%
              </div>
              <div className="flex justify-center gap-8 mt-8">
                <button
                  onClick={() => rejectProfile(match.id)}
                  className="w-[60px] h-[60px] rounded-full bg-destructive text-destructive-foreground text-2xl flex items-center justify-center cursor-pointer border-none hover:opacity-90 transition-opacity"
                >
                  ✕
                </button>
                <button
                  onClick={() => acceptProfile(match.id)}
                  className="w-[60px] h-[60px] rounded-full bg-primary text-primary-foreground text-2xl flex items-center justify-center cursor-pointer border-none hover:opacity-90 transition-opacity"
                >
                  ✓
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}
