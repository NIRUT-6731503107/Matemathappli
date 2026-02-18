import { useAppStore } from "@/lib/useAppStore";
import LoginScreen from "@/components/screens/LoginScreen";
import RegisterScreen from "@/components/screens/RegisterScreen";
import InterestScreen from "@/components/screens/InterestScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import SearchScreen from "@/components/screens/SearchScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import ChatListScreen from "@/components/screens/ChatListScreen";
import ChatScreen from "@/components/screens/ChatScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import { AnimatePresence, motion } from "framer-motion";

const SCREENS: Record<string, React.FC> = {
  login: LoginScreen,
  register: RegisterScreen,
  interests: InterestScreen,
  home: HomeScreen,
  search: SearchScreen,
  profile: ProfileScreen,
  chatList: ChatListScreen,
  chat: ChatScreen,
  settings: SettingsScreen,
};

const Index = () => {
  const { currentScreen } = useAppStore();
  const Screen = SCREENS[currentScreen] || LoginScreen;

  return (
    <div className="min-h-screen min-h-[100dvh] gradient-page-bg flex items-center justify-center p-0 sm:p-5">
      <div className="w-full sm:max-w-[430px] h-screen sm:h-[932px] bg-background sm:rounded-[48px] shadow-2xl overflow-hidden flex flex-col relative sm:border sm:border-border/50">
        {/* Status Bar */}
        <div className="h-12 bg-background/80 backdrop-blur-md flex justify-between items-center px-6 text-foreground text-xs font-medium shrink-0 z-10">
          <div className="font-semibold">9:41</div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              <div className="w-[3px] h-[6px] bg-foreground rounded-sm" />
              <div className="w-[3px] h-[8px] bg-foreground rounded-sm" />
              <div className="w-[3px] h-[10px] bg-foreground rounded-sm" />
              <div className="w-[3px] h-[12px] bg-foreground rounded-sm" />
            </div>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor"><path d="M7.5 3.5C9.15 3.5 10.67 4.12 11.82 5.17L13.24 3.75C11.72 2.33 9.71 1.5 7.5 1.5C5.29 1.5 3.28 2.33 1.76 3.75L3.18 5.17C4.33 4.12 5.85 3.5 7.5 3.5ZM7.5 7.5C8.33 7.5 9.08 7.82 9.64 8.34L7.5 10.5L5.36 8.34C5.92 7.82 6.67 7.5 7.5 7.5Z"/></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2" stroke="currentColor"/><rect x="2" y="2" width="16" height="8" rx="1" fill="currentColor"/><path d="M23 4.5V7.5C23.83 7.16 24.33 6.4 24.33 5.5V6.5C24.33 5.6 23.83 4.84 23 4.5Z" fill="currentColor"/></svg>
          </div>
        </div>
        {/* Screen */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <Screen />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
