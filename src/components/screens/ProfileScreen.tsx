import { useAppStore } from "@/lib/useAppStore";
import { INTEREST_LABELS } from "@/lib/appState";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Settings, Edit3, Heart, Users, Bookmark, ChevronRight } from "lucide-react";

export default function ProfileScreen() {
  const { currentUser, selectedInterests, matches, savedMatches, setScreen } = useAppStore();

  if (!currentUser) return null;

  const stats = [
    { label: "Matches", value: matches.length, icon: Heart, color: "text-pink-400" },
    { label: "Saved", value: savedMatches.length, icon: Bookmark, color: "text-primary" },
    { label: "Interests", value: selectedInterests.length, icon: Users, color: "text-accent" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Profile</h1>
        <button
          onClick={() => setScreen("settings")}
          className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center border border-border/50 bg-transparent cursor-pointer hover:border-primary/30 transition-colors"
        >
          <Settings size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6 mb-5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-20 gradient-primary opacity-10" />
          <div className="relative flex flex-col items-center">
            <div className="w-24 h-24 rounded-3xl gradient-avatar flex items-center justify-center text-5xl shadow-glow mb-4">
              {currentUser.avatarEmoji}
            </div>
            <h2 className="text-xl font-bold text-foreground">{currentUser.name}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              {currentUser.year} • ID: {currentUser.studentId}
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-4 text-center"
              >
                <Icon size={18} className={`mx-auto mb-2 ${stat.color}`} />
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground text-[10px] font-medium mt-0.5">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Interests */}
        <div className="glass-card rounded-2xl p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-foreground">My Interests</span>
            <button
              onClick={() => setScreen("interests")}
              className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center border-none cursor-pointer hover:bg-primary/20 transition-colors"
            >
              <Edit3 size={14} className="text-primary" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map((i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {INTEREST_LABELS[i] || i}
              </span>
            ))}
            {selectedInterests.length === 0 && (
              <p className="text-xs text-muted-foreground">No interests selected yet</p>
            )}
          </div>
        </div>

        {/* Menu items */}
        {[
          { label: "Saved Matches", sub: `${savedMatches.length} profiles saved`, icon: Bookmark },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="glass-card rounded-2xl p-4 mb-3 flex items-center gap-3.5 cursor-pointer hover:border-primary/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          );
        })}
      </div>
      <BottomNav />
    </div>
  );
}
