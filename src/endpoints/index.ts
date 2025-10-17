import * as mocks from "./mocks"

// Check if import.meta exists (Vite) or use process.env (Jest/Node)
const USE_REAL_API = 
  typeof import.meta !== 'undefined' 
    ? (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_USE_REAL_API === "true"
    : process.env.VITE_USE_REAL_API === "true"

export type Endpoints = typeof mocks

export const endpoints: Endpoints = USE_REAL_API ? (mocks as Endpoints) : mocks

export default endpoints
