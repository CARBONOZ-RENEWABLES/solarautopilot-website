// Helper to fetch content from API
async function fetchContent<T>(collection: string, defaultValue: T): Promise<T> {
  if (typeof window === 'undefined') return defaultValue
  try {
    const res = await fetch(`/api/content?collection=${collection}`)
    if (!res.ok) return defaultValue
    const data = await res.json()
    return data || defaultValue
  } catch {
    return defaultValue
  }
}

// Helper to save content to API
async function saveContent<T>(collection: string, data: T): Promise<void> {
  if (typeof window === 'undefined') return
  await fetch('/api/content/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ collection, data })
  })
}

export { fetchContent, saveContent }
