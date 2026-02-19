import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onSwitchToRegister: () => void;
  onBack: () => void;
}

export default function LoginScreen({ onSwitchToRegister, onBack }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("กรุณากรอก Email และ Password");
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error.message || "เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  return (
    <div className="flex-1 gradient-login flex flex-col relative overflow-hidden">
      <div className="absolute top-16 -right-16 w-56 h-56 rounded-full bg-primary/8 blur-[80px]" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/8 blur-[80px]" />

      {/* Back button */}
      <div className="px-6 pt-4 relative z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-foreground bg-transparent border border-border/50 cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center px-8 relative z-10"
      >
        <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center text-4xl font-black text-primary-foreground mb-6 shadow-glow relative">
          <span className="relative z-10">M</span>
          <div className="absolute inset-0 rounded-3xl gradient-primary opacity-50 blur-xl" />
        </div>

        <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-1">Welcome Back</h1>
        <p className="text-sm text-muted-foreground mb-10">Sign in to continue</p>

        <div className="w-full space-y-3.5 mb-8">
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
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
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer btn-primary text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </motion.button>

        <div className="flex flex-col items-center gap-3 mt-8">
          <button
            onClick={onSwitchToRegister}
            className="text-foreground/80 bg-transparent border-none cursor-pointer text-sm hover:text-primary transition-colors"
          >
            New here? <span className="text-primary font-semibold">Create Account</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
