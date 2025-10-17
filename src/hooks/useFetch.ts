import { useState, useEffect } from "react"

interface UseFetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export const useFetch = <T,>(fetchFn: () => Promise<T>, dependencies: unknown[] = []): UseFetchState<T> => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    const fetch = async () => {
      try {
        const result = await fetchFn()
        if (isMounted) {
          setState({ data: result, loading: false, error: null })
        }
      } catch (err) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : "Unknown error",
          })
        }
      }
    }

    fetch()

    return () => {
      isMounted = false
    }
  }, dependencies)

  return state
}
