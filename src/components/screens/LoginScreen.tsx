import { useState } from "react";
import { useAppStore } from "@/lib/useAppStore";
import { motion } from "framer-motion";
import { Eye, EyeOff, Fingerprint } from "lucide-react";

export default function LoginScreen() {
  const { login, setScreen } = useAppStore();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!studentId || !password) {
      alert("กรุณากรอก Student ID และ Password");
      return;
    }
    login(studentId, "Nirut", "Freshman");
  };

  return (
    <div className="flex-1 gradient-login flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-16 -right-16 w-56 h-56 rounded-full bg-primary/8 blur-[80px]" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/8 blur-[80px]" />
      <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-primary/30 animate-pulse" />
      <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: "1s" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center w-full relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
          className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center text-4xl font-black text-primary-foreground mb-6 shadow-glow relative"
        >
          <span className="relative z-10">M</span>
          <div className="absolute inset-0 rounded-3xl gradient-primary opacity-50 blur-xl" />
        </motion.div>

        <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-1">MateMatch</h1>
        <p className="text-sm text-muted-foreground mb-10 text-center tracking-wide">
          Unlock Your Campus Network
        </p>

        <div className="w-full space-y-3.5 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground transition-all"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-5 py-4 pr-12 rounded-2xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground transition-all"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer btn-primary text-primary-foreground tracking-wide transition-all duration-200"
        >
          Sign In
        </motion.button>

        <div className="flex items-center gap-4 my-6 w-full">
          <div className="flex-1 h-px bg-border/50" />
          <span className="text-xs text-muted-foreground">or continue with</span>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-2xl text-sm font-medium cursor-pointer glass-card text-foreground flex items-center justify-center gap-2.5 hover:border-primary/30 transition-all border border-border/50"
        >
          <Fingerprint size={18} className="text-primary" />
          Biometric Login
        </motion.button>

        <div className="flex flex-col items-center gap-3 mt-8">
          <button
            onClick={() => setScreen("register")}
            className="text-foreground/80 bg-transparent border-none cursor-pointer text-sm hover:text-primary transition-colors"
          >
            New here? <span className="text-primary font-semibold">Create Account</span>
          </button>
          <button className="text-muted-foreground bg-transparent border-none cursor-pointer text-xs hover:text-foreground/70 transition-colors">
            Forgot Password?
          </button>
        </div>
      </motion.div>
    </div>
  );
}
