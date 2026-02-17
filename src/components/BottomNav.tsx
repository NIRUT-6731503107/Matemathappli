import { useAppStore } from "@/lib/useAppStore";

const tabs = [
  { id: "home", icon: "🏠" },
  { id: "search", icon: "🔍" },
  { id: "profile", icon: "👤" },
  { id: "chatList", icon: "💬" },
];

export default function BottomNav() {
  const { currentScreen, setScreen } = useAppStore();

  return (
    <div className="h-[70px] bg-card flex justify-around items-center px-5 shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setScreen(tab.id)}
          className={`text-2xl p-2.5 bg-transparent border-none cursor-pointer transition-colors ${
            currentScreen === tab.id ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {tab.icon}
        </button>
      ))}
    </div>
  );
}
