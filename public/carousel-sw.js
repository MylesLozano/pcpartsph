// Simple service worker for caching carousel images
// This service worker caches images from the featured builds to improve performance

const CACHE_NAME = "pcpartsph-carousel-cache-v1";
const URLS_TO_CACHE = [
  "/mockData/images/placeholder-build.webp",
  // The actual build images will be added dynamically
];

// Install event - cache essential resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              cacheName.startsWith("pcpartsph-carousel-cache-") &&
              cacheName !== CACHE_NAME
            );
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// Fetch event - serve from cache if available, otherwise fetch from network
self.addEventListener("fetch", (event) => {
  // Only cache image requests
  if (event.request.url.match(/\.(jpeg|jpg|png|gif|webp|svg)$/)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Otherwise fetch from network
        return fetch(event.request).then((response) => {
          // Return if response is invalid
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response as it can only be consumed once
          const responseToCache = response.clone();

          // Add the valid response to the cache for future use
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
    );
  } else {
    // For non-image requests, perform normal fetch
    event.respondWith(fetch(event.request));
  }
});

// Listen for messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CACHE_CAROUSEL_IMAGES") {
    // Add carousel images to cache when they're loaded in the app
    const imageUrls = event.data.imageUrls;
    if (imageUrls && imageUrls.length) {
      caches.open(CACHE_NAME).then((cache) => {
        cache.addAll(imageUrls.filter((url) => url));
      });
    }
  }
});
