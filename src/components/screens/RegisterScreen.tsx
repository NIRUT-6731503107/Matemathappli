import { useState } from "react";
import { useAppStore } from "@/lib/useAppStore";
import { motion } from "framer-motion";

export default function RegisterScreen() {
  const { login, setScreen } = useAppStore();
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !studentId || !year || !password) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    login(studentId, name, year);
  };

  return (
    <div className="flex-1 gradient-login flex flex-col items-center justify-center px-8 relative overflow-hidden">
      <div className="absolute top-10 -left-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-10 right-0 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center w-full relative z-10"
      >
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-3xl font-black text-primary-foreground mb-4 shadow-glow">
          M
        </div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-1">Create Account</h1>
        <p className="text-sm text-muted-foreground mb-8 text-center">Join Your Campus Network</p>

        <div className="w-full space-y-3 mb-6">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-5 py-4 rounded-xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground transition-all" />
          <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="w-full px-5 py-4 rounded-xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground transition-all" />
          <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-5 py-4 rounded-xl text-sm text-foreground outline-none input-glass appearance-none cursor-pointer">
            <option value="" className="bg-card text-muted-foreground">Select Year</option>
            <option value="Freshman" className="bg-card">Freshman</option>
            <option value="Sophomore" className="bg-card">Sophomore</option>
            <option value="Junior" className="bg-card">Junior</option>
            <option value="Senior" className="bg-card">Senior</option>
          </select>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-4 rounded-xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground transition-all" />
        </div>

        <button onClick={handleRegister} className="w-full py-4 rounded-xl text-sm font-bold cursor-pointer btn-primary text-primary-foreground tracking-wide transition-all duration-200">
          SIGN UP
        </button>
        <button onClick={() => setScreen("login")} className="text-foreground/80 mt-5 bg-transparent border-none cursor-pointer text-sm hover:text-primary transition-colors">
          Already have account? <span className="text-primary font-semibold">Login</span>
        </button>
      </motion.div>
    </div>
  );
}
