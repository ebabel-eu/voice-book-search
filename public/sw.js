// Update the cache name version to promote a new set of files to all clients.
// When a client is closed, next time it opens, the new files will activate
// if they got installed the previous time the game was installed.
const cacheName = 'voice-book-search-cache-1.0.0';
const mutableRequests = [
  'index.html',
  '/',
  'manifest.json',
];

// Long term cache for immutableRequests isn't going to be updated,
// so to save resources and bandwidth, it is kept separate.
const immutableRequests = [
  'favicon.ico',
  'humans.txt',
  'index-offline.html',
  'robots.txt',
  'sitemap.xml',

  'https://unpkg.com/react@16/umd/react.production.min.js',
  'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',

  'bundle.min.js',

  'img/icons/icon-48x48.png',
  'img/icons/icon-72x72.png',
  'img/icons/icon-96x96.png',
  'img/icons/icon-144x144.png',
  'img/icons/icon-192x192.png',
  'img/icons/icon-256x256.png',
  'img/icons/icon-384x384.png',
  'img/icons/icon-512x512.png',

  'img/microphone/mic-animate.gif',
  'img/microphone/mic-slash.gif',
  'img/microphone/mic.gif',
];

// Once a service worker has successfully installed, it enters the "installed" state.
// It will then immediately move on to the "activating" state, unless another active
// service worker is currently controlling this game, in which case it will remain "waiting".
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      const newImmutableRequests = [];
      return Promise.all(
        immutableRequests.map((url) => {
          return caches.match(url).then((response) => {
            if (response) {
              return cache.put(url, response);
            } else {
              newImmutableRequests.push(url);
              return Promise.resolve();
            }
          });
        })
      ).then(() => {
        return cache.addAll(newImmutableRequests.concat(mutableRequests))
      });
    })
  );
});

// Before a service worker becomes active and takes control of the game,
// the "activate" event is triggered. Similar to the installing state, the
// "activating" state can also be extended by calling "event.waitUntil()" and
// passing it a promise.
self.addEventListener('activate', (e) => {
  e.waitUntil(
    // caches.keys() returns a Promise that resolves to an array contraining
    // the names of all the caches we created in our game.
    caches.keys().then((cacheNames) => {
      // Promise.all() takes an array of promises and returns a single promise that only
      // resolves once all the promises in that array have been resolved.
      // If any of these Promises are rejected, the whole Promise.all is also rejected.
      return Promise.all(
        cacheNames.map((_cacheName) => {
          // Delete old caches that are no longer needed, if they are not the
          // one cache currently needed by the game.
          if (_cacheName !== cacheName && cacheName.startsWith('nov2018-cache')) {
            return caches.delete(_cacheName);
          } 
        })
      );
    })
  );
});

// Once a service worker is activated, it is ready to take control of the page
// and listen to functional events such as "fetch".
// This intercepts HTTP requests and handle them with a response from the cache, if any.
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request, { ignoreSearch: true })
        .then((response) => {
          if (response) {
            return response;
          }

          // Fallback to the offline page if cache fails.
          if (e.request.headers.get('accept').includes('text/html')) {
            return caches.match('index-offline.html');
          }
        });
    })
  );
});
