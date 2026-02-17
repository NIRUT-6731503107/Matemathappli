import { useAppStore } from "@/lib/useAppStore";
import { INTERESTS } from "@/lib/appState";
import { motion } from "framer-motion";

export default function InterestScreen() {
  const { selectedInterests, toggleInterest, completeInterests } = useAppStore();
  const progress = (selectedInterests.length / 5) * 100;

  const handleContinue = () => {
    if (selectedInterests.length < 3) {
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
        className="px-6 pt-4 pb-2"
      >
        <h1 className="text-xl font-bold text-foreground">Select Your Interests</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Pick 3-5 interests to find your match</p>
      </motion.div>

      {/* Progress bar */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">{selectedInterests.length}/5 selected</span>
          <span className="text-xs text-primary font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {INTERESTS.map((interest, index) => {
            const selected = selectedInterests.includes(interest.id);
            return (
              <motion.button
                key={interest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const ok = toggleInterest(interest.id);
                  if (!ok) alert("คุณสามารถเลือกได้สูงสุด 5 ความสนใจ");
                }}
                className={`p-4 rounded-2xl text-center cursor-pointer transition-all duration-200 border ${
                  selected
                    ? "bg-primary/15 border-primary/50 shadow-glow-sm"
                    : "glass-card border-transparent hover:border-border"
                }`}
              >
                <div className="text-3xl mb-2">{interest.icon}</div>
                <div className="text-foreground text-xs font-medium">{interest.label}</div>
                {selected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center mx-auto mt-2 text-[10px] text-primary-foreground"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className={`w-full py-4 rounded-xl text-sm font-bold cursor-pointer mt-5 transition-all duration-200 ${
            selectedInterests.length >= 3
              ? "btn-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          }`}
        >
          Continue ({selectedInterests.length}/3 minimum)
        </motion.button>
      </div>
    </div>
  );
}
