import { useState, useEffect, useCallback } from 'react'

interface AsyncState<T> {
  data: T | undefined
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useAsync<T>(fn: () => Promise<T>, deps: any[] = []): AsyncState<T> {
  const [data, setData] = useState<T | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refetchCount, setRefetchCount] = useState(0)

  const refetch = useCallback(() => setRefetchCount((c) => c + 1), [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fn().then((result) => {
      if (!cancelled) { setData(result); setError(null) }
    }).catch((err) => {
      if (!cancelled) setError(err.message || 'Something went wrong')
    }).finally(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, refetchCount])

  return { data, loading, error, refetch }
}
