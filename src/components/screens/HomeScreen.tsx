import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAppStore } from "@/lib/useAppStore";
import { getDiscoverProfiles, swipeAction } from "@/lib/api";
import BottomNav from "@/components/BottomNav";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Heart, X, MapPin, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function HomeScreen() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProfiles = async () => {
    if (!user) return;
    setLoading(true);
    const data = await getDiscoverProfiles(user.id);
    setProfiles(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProfiles();
  }, [user]);

  const handleSwipe = async (targetUserId: string, action: "accept" | "reject") => {
    if (!user) return;
    setProfiles((prev) => prev.filter((p) => p.user_id !== targetUserId));
    await swipeAction(user.id, targetUserId, action);
    if (action === "accept") toast.success("Liked! 💚");
  };

  const currentProfile = profiles[0];

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-6 pt-5 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Discover</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Swipe to connect</p>
        </div>
        <button
          onClick={loadProfiles}
          className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center border border-border/50 bg-transparent cursor-pointer hover:border-primary/30 transition-colors"
        >
          <RefreshCw size={16} className={`text-muted-foreground ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 pb-4">
        <AnimatePresence>
          {loading ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-3xl flex items-center justify-center text-3xl font-black text-primary-foreground mx-auto mb-4 animate-pulse shadow-glow">M</div>
              <p className="text-muted-foreground text-sm">Finding matches...</p>
            </motion.div>
          ) : !currentProfile ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
              <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-5 mx-auto">
                <Heart size={40} className="text-muted-foreground" />
              </div>
              <p className="text-foreground font-semibold text-base">No more profiles</p>
              <p className="text-muted-foreground text-sm mt-2 max-w-[220px] mx-auto">Come back later or refresh to find new people!</p>
              <button onClick={loadProfiles} className="mt-4 px-6 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium border-none cursor-pointer">
                Refresh
              </button>
            </motion.div>
          ) : (
            <SwipeCard
              key={currentProfile.user_id}
              profile={currentProfile}
              onAccept={() => handleSwipe(currentProfile.user_id, "accept")}
              onReject={() => handleSwipe(currentProfile.user_id, "reject")}
            />
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}

function SwipeCard({ profile, onAccept, onReject }: { profile: any; onAccept: () => void; onReject: () => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const acceptOpacity = useTransform(x, [0, 100], [0, 1]);
  const rejectOpacity = useTransform(x, [-100, 0], [1, 0]);

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120) onAccept();
        else if (info.offset.x < -120) onReject();
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      className="w-full max-w-[340px] glass-card rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing relative"
    >
      {/* Swipe indicators */}
      <motion.div style={{ opacity: acceptOpacity }} className="absolute top-6 left-6 z-20 px-4 py-2 rounded-xl border-2 border-green-400 text-green-400 font-bold text-lg rotate-[-12deg]">
        LIKE
      </motion.div>
      <motion.div style={{ opacity: rejectOpacity }} className="absolute top-6 right-6 z-20 px-4 py-2 rounded-xl border-2 border-destructive text-destructive font-bold text-lg rotate-[12deg]">
        NOPE
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-60" />

      <div className="p-7 pb-5">
        <div className="flex flex-col items-center mb-5">
          <div className="w-28 h-28 rounded-3xl gradient-avatar flex items-center justify-center text-5xl shadow-glow mb-4">
            {profile.avatar_emoji || "👤"}
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-foreground">{profile.display_name || "Anonymous"}</h3>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <MapPin size={13} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{profile.year || "Student"}{profile.major ? ` • ${profile.major}` : ""}</span>
          </div>
        </div>

        {profile.bio && (
          <p className="text-sm text-muted-foreground text-center mb-5 leading-relaxed italic">"{profile.bio}"</p>
        )}

        {/* Match score */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" />
              <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${(profile.matchScore / 100) * 176} 176`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">{profile.matchScore}%</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Match Score</div>
            <div className="text-xs text-muted-foreground">Based on shared interests</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-5">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={onReject}
            className="w-14 h-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center cursor-pointer border border-destructive/20 hover:bg-destructive/20 transition-colors"
          >
            <X size={24} strokeWidth={2.5} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={onAccept}
            className="w-14 h-14 rounded-2xl gradient-primary text-primary-foreground flex items-center justify-center cursor-pointer border-none shadow-glow-sm hover:shadow-glow transition-shadow"
          >
            <Heart size={24} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
