import { apiRequest } from "@/utils/api";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

// Base64 → Uint8Array converter
const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const array = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
};

export const setupPushNotification = async () => {
  // Step 1: User-dan icazə al
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  // Step 2: Service Worker hazır olsun
  const registration = await navigator.serviceWorker.ready;

  // Step 3: Telefonun unique push adres-i yarad
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  // Step 4: Bu adres backend-a göndər
  await apiRequest("/subscription", {
    method: "POST",
    body: JSON.stringify(subscription.toJSON()),
  });
};
