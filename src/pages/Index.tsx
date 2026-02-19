import { useAuth } from "@/hooks/useAuth";
import { useAppStore } from "@/lib/useAppStore";
import { useEffect, useState } from "react";
import { getUserInterests } from "@/lib/api";
import LoginScreen from "@/components/screens/LoginScreen";
import RegisterScreen from "@/components/screens/RegisterScreen";
import InterestScreen from "@/components/screens/InterestScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import SearchScreen from "@/components/screens/SearchScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import ChatListScreen from "@/components/screens/ChatListScreen";
import ChatScreen from "@/components/screens/ChatScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import OnboardingScreen from "@/components/screens/OnboardingScreen";
import { AnimatePresence, motion } from "framer-motion";

const AUTH_SCREENS: Record<string, React.FC> = {
  home: HomeScreen,
  interests: InterestScreen,
  search: SearchScreen,
  profile: ProfileScreen,
  chatList: ChatListScreen,
  chat: ChatScreen,
  settings: SettingsScreen,
};

const Index = () => {
  const { user, loading } = useAuth();
  const { currentScreen, setScreen } = useAppStore();
  const [authScreen, setAuthScreen] = useState<"onboarding" | "login" | "register">("onboarding");
  const [needsInterests, setNeedsInterests] = useState<boolean | null>(null);

  // Check if user has interests selected
  useEffect(() => {
    if (user) {
      getUserInterests(user.id).then((interests) => {
        if (interests.length === 0) {
          setNeedsInterests(true);
          setScreen("interests");
        } else {
          setNeedsInterests(false);
          if (currentScreen === "interests") setScreen("home");
        }
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center">
        <div className="w-16 h-16 gradient-primary rounded-3xl flex items-center justify-center text-3xl font-black text-primary-foreground animate-pulse shadow-glow">
          M
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-[100dvh] bg-background flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={authScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {authScreen === "onboarding" && (
              <OnboardingScreen
                onLogin={() => setAuthScreen("login")}
                onRegister={() => setAuthScreen("register")}
              />
            )}
            {authScreen === "login" && (
              <LoginScreen
                onSwitchToRegister={() => setAuthScreen("register")}
                onBack={() => setAuthScreen("onboarding")}
              />
            )}
            {authScreen === "register" && (
              <RegisterScreen
                onSwitchToLogin={() => setAuthScreen("login")}
                onBack={() => setAuthScreen("onboarding")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Logged in but needs interests
  if (needsInterests) {
    return (
      <div className="min-h-[100dvh] bg-background flex flex-col">
        <InterestScreen onComplete={() => setNeedsInterests(false)} />
      </div>
    );
  }

  // Logged in - main app
  const Screen = AUTH_SCREENS[currentScreen] || HomeScreen;

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="flex-1 flex flex-col"
        >
          <Screen />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
