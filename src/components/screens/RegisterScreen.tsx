import { useState } from "react";
import { useAppStore } from "@/lib/useAppStore";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, ChevronDown } from "lucide-react";

export default function RegisterScreen() {
  const { login, setScreen } = useAppStore();
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (!name || !studentId || !year || !password) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    login(studentId, name, year);
  };

  const filled = [name, studentId, year, password].filter(Boolean).length;
  const progress = (filled / 4) * 100;

  return (
    <div className="flex-1 gradient-login flex flex-col relative overflow-hidden">
      <div className="absolute top-10 -left-10 w-40 h-40 rounded-full bg-accent/8 blur-[80px]" />
      <div className="absolute -bottom-10 right-0 w-48 h-48 rounded-full bg-primary/8 blur-[80px]" />

      {/* Header */}
      <div className="px-6 pt-4 pb-2 flex items-center gap-3 relative z-10">
        <button
          onClick={() => setScreen("login")}
          className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-foreground bg-transparent border border-border/50 cursor-pointer hover:border-primary/30 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>
        <span className="text-xs text-muted-foreground font-medium">{filled}/4</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col items-center justify-center px-8 relative z-10"
      >
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-3xl font-black text-primary-foreground mb-5 shadow-glow relative">
          <span className="relative z-10">M</span>
          <div className="absolute inset-0 rounded-2xl gradient-primary opacity-50 blur-xl" />
        </div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight mb-1">Create Account</h1>
        <p className="text-sm text-muted-foreground mb-8 text-center">Join your campus network today</p>

        <div className="w-full space-y-3.5 mb-8">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground transition-all"
          />
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground transition-all"
          />
          <div className="relative">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl text-sm text-foreground outline-none input-glass appearance-none cursor-pointer pr-10"
            >
              <option value="" className="bg-card text-muted-foreground">Select Year</option>
              <option value="Freshman" className="bg-card">Freshman</option>
              <option value="Sophomore" className="bg-card">Sophomore</option>
              <option value="Junior" className="bg-card">Junior</option>
              <option value="Senior" className="bg-card">Senior</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleRegister}
          className={`w-full py-4 rounded-2xl text-sm font-bold cursor-pointer tracking-wide transition-all duration-200 ${
            filled === 4
              ? "btn-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          Create Account
        </motion.button>

        <button
          onClick={() => setScreen("login")}
          className="text-foreground/80 mt-6 bg-transparent border-none cursor-pointer text-sm hover:text-primary transition-colors"
        >
          Already have an account? <span className="text-primary font-semibold">Sign In</span>
        </button>
      </motion.div>
    </div>
  );
}
