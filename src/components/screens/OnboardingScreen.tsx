import { motion } from "framer-motion";
import { Heart, Users, MessageCircle, ArrowRight } from "lucide-react";

interface Props {
  onLogin: () => void;
  onRegister: () => void;
}

const features = [
  { icon: Heart, title: "Smart Matching", desc: "AI-powered interest matching" },
  { icon: Users, title: "Campus Network", desc: "Connect with fellow students" },
  { icon: MessageCircle, title: "Real-time Chat", desc: "Instant messaging with matches" },
];

export default function OnboardingScreen({ onLogin, onRegister }: Props) {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-login" />
      <div className="absolute top-20 -right-20 w-72 h-72 rounded-full bg-primary/8 blur-[100px]" />
      <div className="absolute bottom-32 -left-20 w-80 h-80 rounded-full bg-accent/8 blur-[100px]" />

      <div className="relative z-10 flex-1 flex flex-col px-8 pt-16 pb-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex flex-col items-center mb-12"
        >
          <div className="w-24 h-24 gradient-primary rounded-[28px] flex items-center justify-center text-5xl font-black text-primary-foreground mb-6 shadow-glow relative">
            <span className="relative z-10">M</span>
            <div className="absolute inset-0 rounded-[28px] gradient-primary opacity-40 blur-2xl" />
          </div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight">MateMatch</h1>
          <p className="text-muted-foreground text-base mt-2 text-center max-w-[260px]">
            Find your perfect study partner & campus connection
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-4 mb-auto">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass-card rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shrink-0 shadow-glow-sm">
                  <Icon size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{f.title}</div>
                  <div className="text-xs text-muted-foreground">{f.desc}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3 mt-8"
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onRegister}
            className="w-full py-4 rounded-2xl text-base font-bold cursor-pointer btn-primary text-primary-foreground flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight size={18} />
          </motion.button>
          <button
            onClick={onLogin}
            className="w-full py-3.5 rounded-2xl text-sm font-medium cursor-pointer glass-card text-foreground border border-border/50 hover:border-primary/30 transition-all bg-transparent"
          >
            Already have an account? <span className="text-primary font-semibold">Sign In</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
