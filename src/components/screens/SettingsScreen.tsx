import { useAppStore } from "@/lib/useAppStore";

export default function SettingsScreen() {
  const { currentUser, setScreen, logout } = useAppStore();

  const items = [
    { label: "Display Name", value: currentUser?.name || "" },
    { label: "Year", value: currentUser?.year || "" },
    { label: "Student ID", value: currentUser?.studentId || "" },
    { label: "Notification", value: "On" },
    { label: "Privacy", value: "Public" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 flex items-center">
        <button onClick={() => setScreen("profile")} className="text-2xl text-foreground bg-transparent border-none cursor-pointer mr-4">
          ←
        </button>
        <span className="text-foreground font-bold text-lg flex-1">Settings</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {items.map((item) => (
          <div key={item.label} className="mx-5 my-2.5 bg-card p-5 rounded-[10px] flex justify-between items-center">
            <span className="text-foreground">{item.label}</span>
            <span className="text-muted-foreground text-sm">{item.value}</span>
          </div>
        ))}
        <div className="mx-5 mt-8">
          <button
            onClick={logout}
            className="w-full p-4 bg-destructive text-destructive-foreground border-none rounded-[10px] text-base font-bold cursor-pointer hover:opacity-90 transition-opacity"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
