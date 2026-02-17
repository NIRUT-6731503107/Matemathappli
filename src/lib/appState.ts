export interface User {
  id: string;
  name: string;
  year: string;
  studentId: string;
  major?: string;
  interests: string[];
  bio?: string;
  avatarEmoji: string;
}

export interface MatchedUser extends User {
  matchScore: number;
}

export const INTERESTS = [
  { id: "music", icon: "🎵", label: "Music" },
  { id: "sports", icon: "⚽", label: "Sports" },
  { id: "study", icon: "📚", label: "Study Habits" },
  { id: "gaming", icon: "🎮", label: "Gaming" },
  { id: "art", icon: "🎨", label: "Art" },
  { id: "reading", icon: "📖", label: "Reading" },
  { id: "mobile-dev", icon: "📱", label: "Mobile Dev" },
  { id: "cooking", icon: "🍳", label: "Cooking" },
  { id: "travel", icon: "✈️", label: "Travel" },
  { id: "photography", icon: "📷", label: "Photography" },
] as const;

export const INTEREST_LABELS: Record<string, string> = Object.fromEntries(
  INTERESTS.map((i) => [i.id, `${i.icon} ${i.label}`])
);

export const MOCK_USERS: User[] = [
  {
    id: "u101",
    name: "Lily",
    year: "Sophomore",
    major: "Computer Science",
    interests: ["mobile-dev", "study", "reading"],
    bio: "Looking for study partners to build projects with!",
    avatarEmoji: "👩",
    studentId: "u101",
  },
  {
    id: "u102",
    name: "Mike",
    year: "Junior",
    major: "Engineering",
    interests: ["sports", "gaming", "music"],
    bio: "Always up for a game or gym session!",
    avatarEmoji: "👨",
    studentId: "u102",
  },
  {
    id: "u103",
    name: "Sarah",
    year: "Freshman",
    major: "Arts",
    interests: ["art", "photography", "music"],
    bio: "Creative soul looking for inspiration",
    avatarEmoji: "👧",
    studentId: "u103",
  },
  {
    id: "u104",
    name: "John",
    year: "Sophomore",
    major: "Business",
    interests: ["study", "travel", "cooking"],
    bio: "Let's explore and learn together!",
    avatarEmoji: "👦",
    studentId: "u104",
  },
];

export function calculateMatchScore(
  userInterests: string[],
  otherInterests: string[]
): number {
  if (!userInterests.length || !otherInterests.length) return 0;
  const matches = userInterests.filter((i) => otherInterests.includes(i));
  const total = Math.max(userInterests.length, otherInterests.length);
  return Math.round((matches.length / total) * 100);
}

export function getSuggestedMatches(
  currentUserId: string,
  selectedInterests: string[]
): MatchedUser[] {
  return MOCK_USERS.filter((u) => u.id !== currentUserId)
    .map((u) => ({
      ...u,
      matchScore: calculateMatchScore(selectedInterests, u.interests),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}
