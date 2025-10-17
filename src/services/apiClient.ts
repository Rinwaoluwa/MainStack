import axios, { AxiosError, AxiosInstance } from "axios"
import type { Transaction, Wallet, User } from "@/types"

export interface ApiResponse<T> {
  data: T | null
  status: number
  error?: string
}

const api: AxiosInstance = axios.create({
  baseURL: "https://fe-task-api.mainstack.io",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

function toApiError<T>(err: unknown): ApiResponse<T> {
  if (axios.isAxiosError(err)) {
    const ae = err as AxiosError<any>
    const status = ae.response?.status ?? 0
    const serverMsg =
      (ae.response?.data && (ae.response.data.message || ae.response.data.error)) || undefined
    const message = serverMsg || ae.message || "Request failed"
    return { data: null, status, error: message }
  }
  return { data: null, status: 0, error: (err as Error)?.message ?? "Unknown error" }
}

export const apiClient = {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const res = await api.get<T>(url)
      return { data: res.data, status: res.status }
    } catch (error) {
      return toApiError<T>(error)
    }
  },
}

export async function getTransactions() {
  return apiClient.get<Transaction[]>("/transactions")
}

export async function getWallet() {
  return apiClient.get<Wallet>("/wallet")
}

export async function getUser() {
  return apiClient.get<User>("/user")
}
