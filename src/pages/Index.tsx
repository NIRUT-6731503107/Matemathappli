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
    <div className="min-h-screen gradient-page-bg flex items-center justify-center p-5">
      <div className="w-full max-w-[375px] h-[812px] bg-background rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative">
        {/* Status Bar */}
        <div className="h-11 bg-background flex justify-between items-center px-5 text-foreground text-sm shrink-0">
          <div>16:23</div>
          <div>📶 📡 🔋</div>
        </div>
        {/* Screen */}
        <Screen />
      </div>
    </div>
  );
};

export default Index;
