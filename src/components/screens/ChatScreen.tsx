import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/useAppStore";

interface Message {
  text: string;
  sent: boolean;
}

export default function ChatScreen() {
  const { setScreen } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I saw we matched on study interests 📚", sent: false },
    { text: "Hey! Yeah, I'd love to find a study partner!", sent: true },
    { text: "Looking forward to study together!", sent: false },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, sent: true }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "That sounds great! Let's discuss more details 😊", sent: false },
      ]);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 flex items-center gap-4 bg-background">
        <button onClick={() => setScreen("chatList")} className="text-2xl text-foreground bg-transparent border-none cursor-pointer">
          ←
        </button>
        <div className="w-10 h-10 rounded-full gradient-avatar flex items-center justify-center text-lg">
          👩
        </div>
        <div className="flex-1">
          <div className="text-foreground font-bold">Lily</div>
          <div className="text-xs text-muted-foreground">Online</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex mb-4 gap-2.5 ${msg.sent ? "flex-row-reverse" : ""}`}>
            <div
              className={`max-w-[70%] px-4 py-3 rounded-[18px] ${
                msg.sent ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 bg-card flex gap-2.5 shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-background border-none px-4 py-3 rounded-full text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={sendMessage}
          className="w-[45px] h-[45px] bg-primary border-none rounded-full text-primary-foreground text-xl cursor-pointer flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
