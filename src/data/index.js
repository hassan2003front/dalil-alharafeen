import { users } from "./users";
import { crafts } from "./crafts";
import { craftsmen } from "./craftsmen";
import { orders } from "./orders";
import { proposals } from "./proposals";
import { chats } from "./chats";
import { notifications } from "./notifications";
import { reviews } from "./reviews";

// Load registered users from localStorage
const getMergedUsers = () => {
  const registeredUsers = JSON.parse(
    localStorage.getItem("registered_users") || "[]",
  );
  const merged = [...users, ...registeredUsers];
  // Attach craft names to any user who is a craftsman so demoData.user has them too
  return merged.map((u) => ({
    ...u,
    craftNameAr: u.craftId
      ? (crafts.find((c) => c.id === u.craftId) || {}).nameAr || null
      : u.craftNameAr || null,
    craftNameEn: u.craftId
      ? (crafts.find((c) => c.id === u.craftId) || {}).nameEn || null
      : u.craftNameEn || null,
  }));
};

const allUsers = getMergedUsers();

// Merge registered craftsmen into the craftsmen list
const getMergedCraftsmen = () => {
  const registeredCraftsmen = allUsers
    .filter((u) => u.role === "craftsman")
    .map((u) => ({
      ...u,
      // attach craft names for easier display
      craftNameAr:
        (crafts.find((c) => c.id === u.craftId) || {}).nameAr || null,
      craftNameEn:
        (crafts.find((c) => c.id === u.craftId) || {}).nameEn || null,
      rating: 5.0,
      reviewsCount: 0,
      verified: true,
      bio: u.bio || "فني جديد مسجل في المنصة.",
      location: u.location || "القاهرة",
      pricePerHour: 150,
      completedOrders: 0,
      services: [
        {
          id: 1,
          title: "خدمة أولية",
          titleEn: "Initial Service",
          price: 150,
          type: "hour",
        },
      ],
      portfolio: [
        "/WhatsApp Image 2026-05-03 at 12.48.44 AM (1).jpeg",
        "/WhatsApp Image 2026-05-03 at 12.48.44 AM (2).jpeg",
        "/WhatsApp Image 2026-05-03 at 12.48.44 AM (3).jpeg",
        "/WhatsApp Image 2026-05-03 at 12.48.44 AM.jpeg",
        "/WhatsApp Image 2026-05-03 at 12.48.45 AM (1).jpeg",
        "/WhatsApp Image 2026-05-03 at 12.48.45 AM (2).jpeg",
        "/WhatsApp Image 2026-05-03 at 12.48.45 AM.jpeg",
        "/WhatsApp Image 2026-05-03 at 12.48.46 AM.jpeg",
      ],
    }));
  return [...craftsmen, ...registeredCraftsmen];
};

const allCraftsmen = getMergedCraftsmen();

// Function to get the currently logged-in user from localStorage or default to u1
const getCurrentUser = () => {
  const userId = localStorage.getItem("userId") || "u1";
  return allUsers.find((u) => u.id === userId) || allUsers[0];
};

export const demoData = {
  users: allUsers,
  user: getCurrentUser(),
  crafts,
  craftsmen: allCraftsmen,
  orders,
  proposals,
  chats,
  notifications,
  reviews,
};

// Helper to switch user (simulating login)
export const loginAs = (userId) => {
  const user = allUsers.find((u) => u.id === userId);
  localStorage.setItem("userId", userId);
  localStorage.setItem("token", "demo-token-" + userId);
  if (user) {
    localStorage.setItem("userRole", user.role || "client");
  }
  window.location.reload();
};
