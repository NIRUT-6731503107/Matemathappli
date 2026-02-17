import { useAppStore } from "@/lib/useAppStore";
import { Home, Search, User, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "search", icon: Search, label: "Search" },
  { id: "profile", icon: User, label: "Profile" },
  { id: "chatList", icon: MessageCircle, label: "Chat" },
];

export default function BottomNav() {
  const { currentScreen, setScreen } = useAppStore();

  return (
    <div className="h-[72px] glass flex justify-around items-center px-4 shrink-0">
      {tabs.map((tab) => {
        const active = currentScreen === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id)}
            className={`flex flex-col items-center gap-1 p-2 bg-transparent border-none cursor-pointer transition-all duration-200 relative ${
              active ? "text-primary" : "text-muted-foreground hover:text-foreground/70"
            }`}
          >
            {active && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -top-1 w-8 h-0.5 rounded-full gradient-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
