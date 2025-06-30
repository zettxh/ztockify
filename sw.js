const CACHE_NAME = 'ztockify-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/hooks/useLocalStorage.ts',
  '/hooks/useTheme.ts',
  '/components/Modal.tsx',
  '/components/Toast.tsx',
  '/components/AddItemForm.tsx',
  '/components/InventoryTable.tsx',
  '/components/Navigation.tsx',
  '/components/PageWrapper.tsx',
  '/components/SuccessModal.tsx',
  '/components/ThemeToggle.tsx',
  '/components/views/AddItemView.tsx',
  '/components/views/DataManagementView.tsx',
  '/components/views/ExportImageView.tsx',
  '/components/views/HistoryView.tsx',
  '/components/views/InventoryView.tsx',
  '/components/views/LowStocksView.tsx',
  '/components/views/OutboundView.tsx',
  '/components/views/ReportsView.tsx',
  'https://cdn.tailwindcss.com',
  'https://rsms.me/inter/inter.css',
  'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          (networkResponse) => {
            // Check if we received a valid response
            if (networkResponse && networkResponse.ok) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          }
        ).catch(error => {
            console.error('Fetching failed:', error);
            throw error;
        });
      })
  );
});