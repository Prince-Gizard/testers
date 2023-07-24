import { QueryClient, useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import qs from "qs"

export const VITE_API_URL = import.meta.env.VITE_API_URL
export const VITE_X_AUTH_TOKEN = import.meta.env.VITE_X_AUTH_TOKEN

export const api = axios.create({
  baseURL: `${VITE_API_URL}`,
  headers: {
    withCredentials: false,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/x-www-form-urlencoded",
    "x-auth-token": `${VITE_X_AUTH_TOKEN}`,
    "Access-Control-Allow-Headers": "x-auth-token",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  // validateStatus: status => status > 0,
  //   withCredentials: false,
})

// api.interceptors.request.use(config => {
//   if (config.headers && token)
//      config.headers.Authorization = `Bearer sometoken`;
//     config.headers.Authorization = token;
//   return config;
// });

api.interceptors.response.use(async (res) => {
  if (res.data.errors) {
    throw { errors: res.data.errors }
  }

  // if (res.status === 401 && res.config.headers?.authorization) {
  //   throw new Error('UNAUTHORIZED');
  // }

  return res
})

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        async queryFn({ queryKey }) {
          const res = await api.get(queryKey[0] as string)
          return res.data
        },
      },
      mutations: {
        async mutationFn(data) {
          const params = data as {
            key: string
            data: unknown
            method: unknown
          }
          const res = await api.post(params?.key, params?.data)
          return res.data
        },
      },
    },
  })
}

export type MBSTypes = any
export type QueryObject = {
  [key: string]:
    | number[]
    | QueryObject
    | string[]
    | number
    | string
    | null
    | undefined
}

export const useMbs = (
  params: QueryObject,
  options?: UseQueryOptions<MBSTypes>,
) => {
  const ps = qs.stringify(params)
  return useQuery<MBSTypes>([`${ps}`], {
    ...options,
    refetchOnWindowFocus: false,
  })
}
