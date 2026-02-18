import { useAppStore } from "@/lib/useAppStore";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Edit } from "lucide-react";

const CHATS = [
  { name: "Lily", emoji: "👩", lastMsg: "Looking forward to study together!", time: "2m", unread: 2 },
  { name: "Mike", emoji: "👨", lastMsg: "Want to play basketball this weekend?", time: "1h", unread: 0 },
  { name: "Sarah", emoji: "👧", lastMsg: "That art exhibition was amazing!", time: "3h", unread: 0 },
];

export default function ChatListScreen() {
  const { setScreen } = useAppStore();

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-6 pt-4 pb-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Messages</h1>
        <button className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center border border-border/50 bg-transparent cursor-pointer hover:border-primary/30 transition-colors">
          <Edit size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {CHATS.map((chat, index) => (
          <motion.div
            key={chat.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            className="glass-card rounded-2xl p-4 mb-3 cursor-pointer hover:border-primary/20 transition-all active:scale-[0.98]"
            onClick={() => setScreen("chat")}
          >
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl gradient-avatar flex items-center justify-center text-xl shadow-glow-sm">
                  {chat.emoji}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-background" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-foreground text-sm font-bold">{chat.name}</span>
                  <span className="text-muted-foreground text-[10px]">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground truncate pr-2">{chat.lastMsg}</span>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 rounded-full gradient-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
