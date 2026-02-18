import { useAppStore } from "@/lib/useAppStore";
import { Home, Search, User, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "search", icon: Search, label: "Search" },
  { id: "chatList", icon: MessageCircle, label: "Chat" },
  { id: "profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const { currentScreen, setScreen } = useAppStore();

  return (
    <div className="h-20 bg-background/90 backdrop-blur-xl border-t border-border/50 flex justify-around items-start pt-2.5 px-2 shrink-0">
      {tabs.map((tab) => {
        const active = currentScreen === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id)}
            className={`flex flex-col items-center gap-1 px-4 py-1.5 bg-transparent border-none cursor-pointer transition-all duration-300 relative ${
              active ? "text-primary" : "text-muted-foreground hover:text-foreground/70"
            }`}
          >
            {active && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -top-2.5 w-12 h-1 rounded-full gradient-primary"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <motion.div
              animate={active ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            </motion.div>
            <span className={`text-[10px] ${active ? "font-semibold" : "font-medium"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
