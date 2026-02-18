import { useAppStore } from "@/lib/useAppStore";
import { INTERESTS } from "@/lib/appState";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

export default function InterestScreen() {
  const { selectedInterests, toggleInterest, completeInterests } = useAppStore();
  const progress = (selectedInterests.length / 5) * 100;
  const canContinue = selectedInterests.length >= 3;

  const handleContinue = () => {
    if (!canContinue) {
      alert("กรุณาเลือกอย่างน้อย 3 ความสนใจ");
      return;
    }
    completeInterests();
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-5 pb-3"
      >
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={20} className="text-primary" />
          <h1 className="text-xl font-bold text-foreground">Your Interests</h1>
        </div>
        <p className="text-xs text-muted-foreground">Choose 3-5 to find your perfect match</p>
      </motion.div>

      {/* Progress */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: i < selectedInterests.length ? "hsl(var(--primary))" : "hsl(var(--secondary))",
                }}
                className="w-8 h-1.5 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            ))}
          </div>
          <span className="text-xs text-primary font-semibold">{selectedInterests.length}/5</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {INTERESTS.map((interest, index) => {
            const selected = selectedInterests.includes(interest.id);
            return (
              <motion.button
                key={interest.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const ok = toggleInterest(interest.id);
                  if (!ok) alert("คุณสามารถเลือกได้สูงสุด 5 ความสนใจ");
                }}
                className={`relative p-5 rounded-2xl text-center cursor-pointer transition-all duration-300 border ${
                  selected
                    ? "bg-primary/10 border-primary/40 shadow-glow-sm"
                    : "glass-card border-transparent hover:border-border/80"
                }`}
              >
                {selected && (
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
          className={`w-full py-4 rounded-2xl text-sm font-bold cursor-pointer mt-6 transition-all duration-300 ${
            canContinue
              ? "btn-primary text-primary-foreground shadow-glow-sm"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          {canContinue ? "Continue" : `Select ${3 - selectedInterests.length} more`}
        </motion.button>
      </div>
    </div>
  );
}
