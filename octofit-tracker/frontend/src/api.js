import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export const apiBaseUrl = API_BASE_URL

export const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export function useApiResource(resource) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE_URL}/${resource}/`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        return response.json()
      })
      .then((payload) => setState({ data: normalizeCollection(payload), loading: false, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: [], loading: false, error: error.message })
      })

    return () => controller.abort()
  }, [resource])

  return state
}
