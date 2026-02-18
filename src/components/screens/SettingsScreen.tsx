import { useAppStore } from "@/lib/useAppStore";
import { motion } from "framer-motion";
import { ArrowLeft, User, GraduationCap, CreditCard, Bell, Shield, LogOut, ChevronRight } from "lucide-react";

export default function SettingsScreen() {
  const { currentUser, setScreen, logout } = useAppStore();

  const sections = [
    {
      title: "Account",
      items: [
        { label: "Display Name", value: currentUser?.name || "", icon: User },
        { label: "Year", value: currentUser?.year || "", icon: GraduationCap },
        { label: "Student ID", value: currentUser?.studentId || "", icon: CreditCard },
      ],
    },
    {
      title: "Preferences",
      items: [
        { label: "Notifications", value: "On", icon: Bell },
        { label: "Privacy", value: "Public", icon: Shield },
      ],
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-4 pb-3 flex items-center gap-3">
        <button
          onClick={() => setScreen("profile")}
          className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center text-foreground bg-transparent border border-border/50 cursor-pointer hover:border-primary/30 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
            className="mb-6"
          >
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">
              {section.title}
            </p>
            <div className="glass-card rounded-2xl overflow-hidden divide-y divide-border/30">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3.5 px-4 py-3.5 cursor-pointer hover:bg-secondary/30 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon size={15} className="text-primary" />
                    </div>
                    <span className="flex-1 text-sm text-foreground">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.value}</span>
                    <ChevronRight size={14} className="text-muted-foreground" />
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold cursor-pointer bg-destructive/10 text-destructive border border-destructive/20 flex items-center justify-center gap-2 hover:bg-destructive/20 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </motion.button>

        <p className="text-center text-[10px] text-muted-foreground mt-6">
          MateMatch v1.0.0 • Made with ❤️
        </p>
      </div>
    </div>
  );
}
