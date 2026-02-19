import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onSwitchToLogin: () => void;
  onBack: () => void;
}

export default function RegisterScreen({ onSwitchToLogin, onBack }: Props) {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    if (password.length < 6) {
      toast.error("Password ต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, name);
    setLoading(false);
    if (error) {
      toast.error(error.message || "สมัครสมาชิกไม่สำเร็จ");
    } else {
      toast.success("สมัครสมาชิกสำเร็จ!");
    }
  };

  const filled = [name, email, password].filter(Boolean).length;
  const progress = (filled / 3) * 100;

  return (
    <div className="flex-1 gradient-login flex flex-col relative overflow-hidden">
      <div className="absolute top-10 -left-10 w-40 h-40 rounded-full bg-accent/8 blur-[80px]" />
      <div className="absolute -bottom-10 right-0 w-48 h-48 rounded-full bg-primary/8 blur-[80px]" />

      {/* Header */}
      <div className="px-6 pt-4 pb-2 flex items-center gap-3 relative z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-foreground bg-transparent border border-border/50 cursor-pointer"
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
        <span className="text-xs text-muted-foreground font-medium">{filled}/3</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center px-8 relative z-10"
      >
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-3xl font-black text-primary-foreground mb-5 shadow-glow relative">
          <span className="relative z-10">M</span>
          <div className="absolute inset-0 rounded-2xl gradient-primary opacity-50 blur-xl" />
        </div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight mb-1">Create Account</h1>
        <p className="text-sm text-muted-foreground mb-8">Join your campus network today</p>

        <div className="w-full space-y-3.5 mb-8">
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Display Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-11 pr-5 py-4 rounded-2xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground"
            />
          </div>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-5 py-4 rounded-2xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-12 py-4 rounded-2xl text-sm text-foreground outline-none input-glass placeholder:text-muted-foreground"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-4 rounded-2xl text-sm font-bold cursor-pointer tracking-wide transition-all duration-200 disabled:opacity-50 ${
            filled === 3 ? "btn-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
          }`}
        >
          {loading ? "Creating account..." : "Create Account"}
        </motion.button>

        <button
          onClick={onSwitchToLogin}
          className="text-foreground/80 mt-6 bg-transparent border-none cursor-pointer text-sm hover:text-primary transition-colors"
        >
          Already have an account? <span className="text-primary font-semibold">Sign In</span>
        </button>
      </motion.div>
    </div>
  );
}
