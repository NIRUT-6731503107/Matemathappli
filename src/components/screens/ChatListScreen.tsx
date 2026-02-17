import { useAppStore } from "@/lib/useAppStore";
import BottomNav from "@/components/BottomNav";

const CHATS = [
  { name: "Lily", emoji: "👩", lastMsg: "Looking forward to study together!", time: "2m ago" },
  { name: "Mike", emoji: "👨", lastMsg: "Want to play basketball this weekend?", time: "1h ago" },
];

export default function ChatListScreen() {
  const { setScreen } = useAppStore();

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-5">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-5">
        {CHATS.map((chat) => (
          <div
            key={chat.name}
            className="bg-card rounded-[20px] p-5 mb-3 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setScreen("chat")}
          >
            <div className="flex items-center gap-4">
              <div className="w-[50px] h-[50px] rounded-full gradient-avatar flex items-center justify-center text-2xl">
                {chat.emoji}
              </div>
              <div className="flex-1 text-left">
                <div className="text-foreground text-base font-bold">{chat.name}</div>
                <div className="text-sm text-muted-foreground">{chat.lastMsg}</div>
              </div>
              <div className="text-muted-foreground text-xs">{chat.time}</div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
