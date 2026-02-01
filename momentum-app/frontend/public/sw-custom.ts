/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkOnly, NetworkFirst } from "workbox-strategies";
import { BackgroundSyncPlugin } from "workbox-background-sync";
import { ExpirationPlugin } from "workbox-expiration";

// Precache faylları
precacheAndRoute(self.__WB_MANIFEST || []);

// Background Sync plugin
const bgSyncPlugin = new BackgroundSyncPlugin("taskQueue", {
  maxRetentionTime: 24 * 60,
});

// POST/PUT/DELETE requestlər
registerRoute(
  ({ url, request }) => {
    return (
      url.href.includes("momentum02.onrender.com") &&
      ["POST", "PUT", "DELETE"].includes(request.method)
    );
  },
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST",
);

// GET requestlər
registerRoute(
  ({ url }) => url.href.includes("momentum02.onrender.com"),
  new NetworkFirst({
    cacheName: "api-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  }),
);

self.addEventListener("push", (event) => {
  const { title, body } = JSON.parse(event.data?.text() || "{}");

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/icon-192.png",
      badge: "/badge-72.png",
      requireInteraction: true,
    }),
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ includeControlled: true }).then((clients) => {
      const windowClients = clients.filter(
        (client): client is WindowClient => client.kind === "window",
      );

      if (windowClients.length > 0) {
        windowClients[0].focus(); // ✅ WindowClient-da focus var
      } else {
        self.clients.openWindow("/");
      }
    }),
  );
});
