import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAppStore } from "@/lib/useAppStore";
import { getProfile, updateProfile } from "@/lib/api";
import { motion } from "framer-motion";
import { ArrowLeft, User, GraduationCap, Mail, Bell, Shield, LogOut, ChevronRight, Save } from "lucide-react";
import { toast } from "sonner";

export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  const { setScreen } = useAppStore();
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ display_name: "", year: "", major: "", bio: "", avatar_emoji: "👨" });

  useEffect(() => {
    if (!user) return;
    getProfile(user.id).then((p) => {
      if (p) {
        setProfile(p);
        setForm({ display_name: p.display_name, year: p.year, major: p.major || "", bio: p.bio || "", avatar_emoji: p.avatar_emoji });
      }
    });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    await updateProfile(user.id, form);
    setProfile({ ...profile, ...form });
    setEditing(false);
    toast.success("Profile updated!");
  };

  const handleLogout = async () => {
    await signOut();
  };

  const emojis = ["👨", "👩", "👦", "👧", "🧑", "👨‍💻", "👩‍💻", "🧑‍🎓"];

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-6 pt-5 pb-3 flex items-center gap-3">
        <button
          onClick={() => setScreen("profile")}
          className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center text-foreground bg-transparent border border-border/50 cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-foreground flex-1">Settings</h1>
        {editing && (
          <button onClick={handleSave} className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center border-none cursor-pointer shadow-glow-sm">
            <Save size={16} className="text-primary-foreground" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Avatar picker */}
        {editing && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">Choose Avatar</p>
            <div className="flex gap-2 flex-wrap">
              {emojis.map((e) => (
                <button
                  key={e}
                  onClick={() => setForm({ ...form, avatar_emoji: e })}
                  className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center cursor-pointer transition-all border ${
                    form.avatar_emoji === e ? "gradient-primary border-primary/40 shadow-glow-sm" : "glass-card border-transparent"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Profile fields */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Profile</p>
            <button
              onClick={() => setEditing(!editing)}
              className="text-xs text-primary font-medium bg-transparent border-none cursor-pointer"
            >
              {editing ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden divide-y divide-border/30">
            {[
              { label: "Name", value: form.display_name, key: "display_name", icon: User },
              { label: "Year", value: form.year, key: "year", icon: GraduationCap },
              { label: "Major", value: form.major, key: "major", icon: GraduationCap },
              { label: "Bio", value: form.bio, key: "bio", icon: Mail },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="flex items-center gap-3.5 px-4 py-3.5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-primary" />
                  </div>
                  <span className="text-sm text-foreground w-16 shrink-0">{item.label}</span>
                  {editing ? (
                    <input
                      value={item.value}
                      onChange={(e) => setForm({ ...form, [item.key]: e.target.value })}
                      className="flex-1 text-sm text-foreground bg-transparent border-none outline-none text-right placeholder:text-muted-foreground"
                      placeholder={`Enter ${item.label.toLowerCase()}`}
                    />
                  ) : (
                    <span className="flex-1 text-xs text-muted-foreground text-right">{item.value || "—"}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Email (read only) */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">Account</p>
          <div className="glass-card rounded-2xl px-4 py-3.5 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mail size={15} className="text-primary" />
            </div>
            <span className="text-sm text-foreground flex-1">Email</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </div>

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold cursor-pointer bg-destructive/10 text-destructive border border-destructive/20 flex items-center justify-center gap-2 hover:bg-destructive/20 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </motion.button>

        <p className="text-center text-[10px] text-muted-foreground mt-6">MateMatch v2.0 • Made with ❤️</p>
      </div>
    </div>
  );
}
