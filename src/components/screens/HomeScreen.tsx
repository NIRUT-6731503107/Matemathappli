import { useAppStore } from "@/lib/useAppStore";
import BottomNav from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeScreen() {
  const { matches, acceptProfile, rejectProfile } = useAppStore();

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Discover</h1>
          <p className="text-xs text-muted-foreground">Find your perfect match</p>
        </div>
        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
          {matches.length}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <AnimatePresence>
          {matches.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-foreground font-semibold text-sm">No matches found</p>
              <p className="text-muted-foreground text-xs mt-1">Try selecting more interests!</p>
            </motion.div>
          ) : (
            matches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-3xl p-6 text-center mb-4 overflow-hidden relative"
              >
                {/* Subtle gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-60" />

                <div className="w-24 h-24 rounded-full gradient-avatar mx-auto mb-4 flex items-center justify-center text-4xl shadow-glow-sm">
                  {match.avatarEmoji}
                </div>
                <div className="text-xl font-bold text-foreground mb-0.5">
                  {match.name}
                </div>
                <div className="text-xs text-muted-foreground mb-4">
                  {match.year} • {match.major}
                </div>

                {/* Match score ring */}
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="35" fill="none" stroke="hsl(var(--secondary))" strokeWidth="4" />
                    <circle
                      cx="40" cy="40" r="35" fill="none" stroke="hsl(var(--primary))"
                      strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={`${(match.matchScore / 100) * 220} 220`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{match.matchScore}%</span>
                  </div>
                </div>

                {match.bio && (
                  <p className="text-xs text-muted-foreground mb-5 italic">"{match.bio}"</p>
                )}

                <div className="flex justify-center gap-5">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => rejectProfile(match.id)}
                    className="w-14 h-14 rounded-full bg-destructive/15 text-destructive text-xl flex items-center justify-center cursor-pointer border border-destructive/30 hover:bg-destructive/25 transition-colors"
                  >
                    ✕
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => acceptProfile(match.id)}
                    className="w-14 h-14 rounded-full gradient-primary text-primary-foreground text-xl flex items-center justify-center cursor-pointer border-none shadow-glow-sm hover:shadow-glow transition-shadow"
                  >
                    ✓
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}
