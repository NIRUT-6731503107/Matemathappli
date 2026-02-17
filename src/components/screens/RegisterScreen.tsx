import { useState } from "react";
import { useAppStore } from "@/lib/useAppStore";

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
    <div className="flex-1 gradient-login flex flex-col items-center justify-center px-10">
      <div className="w-20 h-20 bg-foreground rounded-[20px] flex items-center justify-center text-4xl font-bold text-accent mb-5">
        M
      </div>
      <h1 className="text-[32px] font-bold text-foreground mb-2.5">Create Account</h1>
      <p className="text-lg text-foreground/90 mb-14 text-center">Join Your Campus Network</p>

      <div className="w-full mb-4">
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 rounded-[10px] bg-foreground text-background text-base outline-none" />
      </div>
      <div className="w-full mb-4">
        <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="w-full p-4 rounded-[10px] bg-foreground text-background text-base outline-none" />
      </div>
      <div className="w-full mb-4">
        <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-4 rounded-[10px] bg-foreground text-background text-base outline-none">
          <option value="">Select Year</option>
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
      </div>
      <div className="w-full mb-4">
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 rounded-[10px] bg-foreground text-background text-base outline-none" />
      </div>
      <button onClick={handleRegister} className="w-full p-4 rounded-[10px] bg-primary text-primary-foreground text-lg font-bold cursor-pointer mt-5 hover:opacity-90 transition-opacity">
        SIGN UP
      </button>
      <button onClick={() => setScreen("login")} className="text-foreground mt-4 bg-transparent border-none cursor-pointer text-base">
        Already have account? Login
      </button>
    </div>
  );
}
