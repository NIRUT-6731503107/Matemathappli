import { useState } from "react";
import { useAppStore } from "@/lib/useAppStore";

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
    <div className="flex-1 gradient-login flex flex-col items-center justify-center px-10">
      <div className="w-20 h-20 bg-foreground rounded-[20px] flex items-center justify-center text-4xl font-bold text-accent mb-5">
        M
      </div>
      <h1 className="text-[32px] font-bold text-foreground mb-2.5">MateMatch</h1>
      <p className="text-lg text-foreground/90 mb-14 text-center">
        Unlock Your
        <br />
        Campus Network
      </p>
      <div className="w-full mb-4">
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full p-4 rounded-[10px] bg-foreground text-background text-base outline-none"
        />
      </div>
      <div className="w-full mb-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-[10px] bg-foreground text-background text-base outline-none"
        />
      </div>
      <button
        onClick={handleLogin}
        className="w-full p-4 rounded-[10px] bg-primary text-primary-foreground text-lg font-bold cursor-pointer mt-5 hover:opacity-90 transition-opacity"
      >
        LOGIN
      </button>
      <button
        onClick={() => setScreen("register")}
        className="text-foreground mt-4 bg-transparent border-none cursor-pointer text-base"
      >
        New here? Sign Up
      </button>
      <button className="text-foreground/70 mt-2 bg-transparent border-none cursor-pointer text-sm">
        Forgot Password?
      </button>
    </div>
  );
}
