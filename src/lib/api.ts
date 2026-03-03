import { supabase } from "@/integrations/supabase/client";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validateUUID(id: string): string {
  if (!UUID_REGEX.test(id)) throw new Error("Invalid UUID");
  return id;
}

export interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  year: string;
  major: string;
  bio: string;
  avatar_url: string;
  avatar_emoji: string;
}

async function getAuthenticatedUserId(): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return user.id;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  validateUUID(userId);
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data as Profile | null;
}

export async function updateProfile(updates: Partial<Profile>) {
  const userId = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("user_id", userId);
  return { error };
}

export async function getUserInterests(userId: string): Promise<string[]> {
  validateUUID(userId);
  const { data } = await supabase
    .from("user_interests")
    .select("interest_id")
    .eq("user_id", userId);
  return (data || []).map((d: any) => d.interest_id);
}

export async function setUserInterests(interests: string[]) {
  const userId = await getAuthenticatedUserId();
  // Delete existing
  await supabase.from("user_interests").delete().eq("user_id", userId);
  // Insert new
  if (interests.length > 0) {
    const rows = interests.map((interest_id) => ({ user_id: userId, interest_id }));
    await supabase.from("user_interests").insert(rows);
  }
}

export async function getDiscoverProfiles(currentUserId: string) {
  validateUUID(currentUserId);
  // Get profiles excluding current user and already-swiped users
  const { data: swipedData } = await supabase
    .from("matches")
    .select("target_user_id")
    .eq("user_id", currentUserId);

  const swipedIds = (swipedData || []).map((d: any) => d.target_user_id);
  const excludeIds = [currentUserId, ...swipedIds];

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .not("user_id", "in", `(${excludeIds.map(id => validateUUID(id)).join(",")})`);

  // Get interests for all fetched profiles
  const userIds = (profiles || []).map((p: any) => p.user_id);
  const { data: allInterests } = await supabase
    .from("user_interests")
    .select("user_id, interest_id")
    .in("user_id", userIds.length > 0 ? userIds : ["none"]);

  // Get current user interests
  const myInterests = await getUserInterests(currentUserId);

  const enriched = (profiles || []).map((p: any) => {
    const theirInterests = (allInterests || [])
      .filter((i: any) => i.user_id === p.user_id)
      .map((i: any) => i.interest_id);
    const shared = myInterests.filter((i) => theirInterests.includes(i));
    const total = Math.max(myInterests.length, theirInterests.length, 1);
    const matchScore = Math.round((shared.length / total) * 100);
    return { ...p, interests: theirInterests, sharedCount: shared.length, matchScore };
  });

  // Prioritize profiles with at least 1 shared interest, then fallback to others
  const withShared = enriched.filter((p: any) => p.sharedCount > 0).sort((a: any, b: any) => b.matchScore - a.matchScore);
  const withoutShared = enriched.filter((p: any) => p.sharedCount === 0).sort(() => Math.random() - 0.5);

  return [...withShared, ...withoutShared];
}

export async function swipeAction(targetUserId: string, action: "accept" | "reject") {
  validateUUID(targetUserId);
  const userId = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("matches")
    .insert({ user_id: userId, target_user_id: targetUserId, action });

  // Check for mutual match
  let isMutual = false;
  if (action === "accept" && !error) {
    const { data } = await supabase
      .from("matches")
      .select("id")
      .eq("user_id", targetUserId)
      .eq("target_user_id", userId)
      .eq("action", "accept")
      .maybeSingle();
    isMutual = !!data;
  }

  return { error, isMutual };
}

export async function getMutualMatches(userId: string) {
  validateUUID(userId);
  // Get users who I accepted AND who accepted me
  const { data: myAccepts } = await supabase
    .from("matches")
    .select("target_user_id")
    .eq("user_id", userId)
    .eq("action", "accept");

  const myAcceptIds = (myAccepts || []).map((d: any) => d.target_user_id);
  if (myAcceptIds.length === 0) return [];

  const { data: theirAccepts } = await supabase
    .from("matches")
    .select("user_id")
    .in("user_id", myAcceptIds)
    .eq("target_user_id", userId)
    .eq("action", "accept");

  const mutualIds = (theirAccepts || []).map((d: any) => d.user_id);
  if (mutualIds.length === 0) return [];

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .in("user_id", mutualIds);

  return profiles || [];
}

export async function getMessages(userId: string, otherUserId: string) {
  validateUUID(userId);
  validateUUID(otherUserId);
  const { data } = await supabase
    .from("messages")
    .select("*")
    .or(
      `and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`
    )
    .order("created_at", { ascending: true });
  return data || [];
}

export async function sendMessage(receiverId: string, content: string) {
  validateUUID(receiverId);
  const trimmed = content.trim();
  if (!trimmed || trimmed.length > 10000) {
    return { error: new Error("Message must be between 1 and 10000 characters") };
  }
  const senderId = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("messages")
    .insert({ sender_id: senderId, receiver_id: receiverId, content: trimmed });
  return { error };
}

export async function getConversations(userId: string) {
  validateUUID(userId);
  // Get latest message per conversation partner
  const { data: sent } = await supabase
    .from("messages")
    .select("*")
    .eq("sender_id", userId)
    .order("created_at", { ascending: false });

  const { data: received } = await supabase
    .from("messages")
    .select("*")
    .eq("receiver_id", userId)
    .order("created_at", { ascending: false });

  const allMessages = [...(sent || []), ...(received || [])];
  
  // Group by conversation partner
  const convMap = new Map<string, any>();
  for (const msg of allMessages) {
    const partnerId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
    if (!convMap.has(partnerId) || new Date(msg.created_at) > new Date(convMap.get(partnerId).created_at)) {
      convMap.set(partnerId, msg);
    }
  }

  // Get profiles for partners
  const partnerIds = Array.from(convMap.keys());
  if (partnerIds.length === 0) return [];

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .in("user_id", partnerIds);

  // Count unread
  const { data: unreadData } = await supabase
    .from("messages")
    .select("sender_id")
    .eq("receiver_id", userId)
    .eq("read", false);

  const unreadMap = new Map<string, number>();
  for (const u of unreadData || []) {
    unreadMap.set(u.sender_id, (unreadMap.get(u.sender_id) || 0) + 1);
  }

  return partnerIds.map((partnerId) => {
    const profile = (profiles || []).find((p: any) => p.user_id === partnerId);
    const lastMsg = convMap.get(partnerId);
    return {
      partnerId,
      profile,
      lastMessage: lastMsg?.content || "",
      lastMessageTime: lastMsg?.created_at || "",
      unreadCount: unreadMap.get(partnerId) || 0,
    };
  }).sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
}
