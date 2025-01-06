const CACHE_NAME = 'pricey-v1'

async function networkFirst (request) {
    try {
        const networkResponse = await fetch(request)
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME)
            cache.put(request, networkResponse.clone())
        }
        return networkResponse
    } catch (error) {
        const cachedResponse = await caches.match(request)
        return cachedResponse || Response.error()
    }
}

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)
    event.respondWith(networkFirst(event.request))
})