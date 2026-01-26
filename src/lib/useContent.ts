'use client'
import { useState, useEffect } from 'react'

export function useContent(collection: string, slug?: string) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = slug 
          ? `/api/content?collection=${collection}&slug=${slug}`
          : `/api/content?collection=${collection}`
        
        const res = await fetch(url)
        const result = await res.json()
        setData(result)
      } catch (error) {
        console.error('Failed to fetch content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [collection, slug])

  return { data, loading }
}