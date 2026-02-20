import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAppStore } from "@/lib/useAppStore";
import { INTERESTS } from "@/lib/appState";
import { getUserInterests, setUserInterests } from "@/lib/api";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onComplete?: () => void;
}

export default function InterestScreen({ onComplete }: Props) {
  const { user } = useAuth();
  const { setScreen } = useAppStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      getUserInterests(user.id).then(setSelected);
    }
  }, [user]);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < 5) {
      setSelected([...selected, id]);
    } else {
      toast.error("สูงสุด 5 ความสนใจ");
    }
  };

  const handleContinue = async () => {
    if (selected.length < 3) {
      toast.error("เลือกอย่างน้อย 3 ความสนใจ");
      return;
    }
    if (!user) return;
    setSaving(true);
    await setUserInterests(selected);
    setSaving(false);
    if (onComplete) {
      onComplete();
      setScreen("home");
    } else {
      setScreen("home");
    }
    toast.success("บันทึกความสนใจแล้ว!");
  };

  const canContinue = selected.length >= 3;

  return (
    <div className="flex-1 flex flex-col bg-background">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-3"
      >
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={20} className="text-primary" />
          <h1 className="text-xl font-bold text-foreground">Your Interests</h1>
        </div>
        <p className="text-xs text-muted-foreground">Choose 3-5 to find your perfect match</p>
      </motion.div>

      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: i < selected.length ? "hsl(var(--primary))" : "hsl(var(--secondary))",
                }}
                className="w-8 h-1.5 rounded-full"
              />
            ))}
          </div>
          <span className="text-xs text-primary font-semibold">{selected.length}/5</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {INTERESTS.map((interest, index) => {
            const isSelected = selected.includes(interest.id);
            return (
              <motion.button
                key={interest.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggle(interest.id)}
                className={`relative p-5 rounded-2xl text-center cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? "bg-primary/10 border-primary/40 shadow-glow-sm"
                    : "glass-card border-transparent hover:border-border/80"
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full gradient-primary flex items-center justify-center"
                  >
                    <Check size={12} className="text-primary-foreground" />
                  </motion.div>
                )}
                <div className="text-3xl mb-2.5">{interest.icon}</div>
                <div className="text-foreground text-xs font-semibold">{interest.label}</div>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          disabled={saving}
          className={`w-full py-4 rounded-2xl text-sm font-bold cursor-pointer mt-6 transition-all duration-300 disabled:opacity-50 ${
            canContinue ? "btn-primary text-primary-foreground shadow-glow-sm" : "bg-secondary text-muted-foreground"
          }`}
        >
          {saving ? "Saving..." : canContinue ? "Continue" : `Select ${3 - selected.length} more`}
        </motion.button>
      </div>
    </div>
  );
}
