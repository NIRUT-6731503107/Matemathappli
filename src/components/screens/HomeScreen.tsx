import { useAppStore } from "@/lib/useAppStore";
import BottomNav from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Sparkles, MapPin } from "lucide-react";

export default function HomeScreen() {
  const { matches, acceptProfile, rejectProfile, currentUser } = useAppStore();

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-4 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Hi, {currentUser?.name || "there"} 👋
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">Find your perfect match</p>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center shadow-glow-sm">
            <Sparkles size={18} className="text-primary-foreground" />
          </div>
          {matches.length > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
              {matches.length}
            </div>
          )}
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
              <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-5">
                <Heart size={40} className="text-muted-foreground" />
              </div>
              <p className="text-foreground font-semibold text-base">No more matches</p>
              <p className="text-muted-foreground text-sm mt-2 max-w-[200px]">
                Try adding more interests to discover new people!
              </p>
            </motion.div>
          ) : (
            matches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -200, rotate: -5 }}
                transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-3xl overflow-hidden mb-5 relative group"
              >
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-60" />

                {/* Profile section */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-2xl gradient-avatar flex items-center justify-center text-3xl shadow-glow-sm shrink-0">
                      {match.avatarEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-foreground truncate">{match.name}</h3>
                        <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <MapPin size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{match.year} • {match.major}</span>
                      </div>
                      {match.bio && (
                        <p className="text-xs text-muted-foreground mt-2.5 leading-relaxed line-clamp-2">
                          "{match.bio}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Match score + actions */}
                <div className="px-6 pb-6 flex items-center justify-between">
                  {/* Match score */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" />
                        <circle
                          cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--primary))"
                          strokeWidth="3" strokeLinecap="round"
                          strokeDasharray={`${(match.matchScore / 100) * 151} 151`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{match.matchScore}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Match Score</div>
                      <div className="text-[10px] text-muted-foreground">Based on interests</div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => rejectProfile(match.id)}
                      className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center cursor-pointer border border-destructive/20 hover:bg-destructive/20 transition-colors"
                    >
                      <X size={20} strokeWidth={2.5} />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => acceptProfile(match.id)}
                      className="w-12 h-12 rounded-2xl gradient-primary text-primary-foreground flex items-center justify-center cursor-pointer border-none shadow-glow-sm hover:shadow-glow transition-shadow"
                    >
                      <Heart size={20} strokeWidth={2.5} />
                    </motion.button>
                  </div>
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
