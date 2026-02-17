import { useAppStore } from "@/lib/useAppStore";
import { INTERESTS } from "@/lib/appState";

export default function InterestScreen() {
  const { selectedInterests, toggleInterest, completeInterests } = useAppStore();
  const progress = (selectedInterests.length / 5) * 100;

  const handleContinue = () => {
    if (selectedInterests.length < 3) {
      alert("กรุณาเลือกอย่างน้อย 3 ความสนใจ");
      return;
    }
    completeInterests();
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-5">
        <h1 className="text-2xl font-bold text-foreground">Select Your Interests</h1>
        <p className="text-sm text-muted-foreground">Pick 3-5 interests</p>
      </div>
      <div className="px-5 pb-3">
        <div className="h-1.5 bg-card rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        <div className="grid grid-cols-2 gap-4">
          {INTERESTS.map((interest) => {
            const selected = selectedInterests.includes(interest.id);
            return (
              <button
                key={interest.id}
                onClick={() => {
                  const ok = toggleInterest(interest.id);
                  if (!ok) alert("คุณสามารถเลือกได้สูงสุด 5 ความสนใจ");
                }}
                className={`p-5 rounded-[15px] text-center cursor-pointer transition-all border-2 ${
                  selected
                    ? "bg-primary/20 border-primary"
                    : "bg-card border-transparent"
                }`}
              >
                <div className="text-[40px] mb-2.5">{interest.icon}</div>
                <div className="text-foreground text-sm">{interest.label}</div>
              </button>
            );
          })}
        </div>
        <button
          onClick={handleContinue}
          className="w-full p-4 bg-primary text-primary-foreground rounded-[10px] text-base font-bold cursor-pointer mt-5 hover:opacity-90 transition-opacity"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
