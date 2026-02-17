import { useState } from "react";
import { useAppStore } from "@/lib/useAppStore";
import { motion } from "framer-motion";

export default function LoginScreen() {
  const { login, setScreen } = useAppStore();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!studentId || !password) {
      alert("กรุณากรอก Student ID และ Password");
      return;
    }
    login(studentId, "Nirut", "Freshman");
  };

  return (
    <div className="flex-1 gradient-login flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-accent/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center w-full relative z-10"
      >
        {/* Logo */}
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-3xl font-black text-primary-foreground mb-4 shadow-glow">
          M
        </div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-1">MateMatch</h1>
        <p className="text-sm text-muted-foreground mb-10 text-center tracking-wide">
          Unlock Your Campus Network
        </p>

        <div className="w-full space-y-3 mb-6">
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full px-5 py-4 rounded-xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 rounded-xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground transition-all"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-4 rounded-xl text-sm font-bold cursor-pointer btn-primary text-primary-foreground tracking-wide transition-all duration-200"
        >
          LOGIN
        </button>

        <div className="flex flex-col items-center gap-2 mt-6">
          <button
            onClick={() => setScreen("register")}
            className="text-foreground/80 bg-transparent border-none cursor-pointer text-sm hover:text-primary transition-colors"
          >
            New here? <span className="text-primary font-semibold">Sign Up</span>
          </button>
          <button className="text-muted-foreground bg-transparent border-none cursor-pointer text-xs hover:text-foreground/70 transition-colors">
            Forgot Password?
          </button>
        </div>
      </motion.div>
    </div>
  );
}
