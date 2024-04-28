
export const LOCAL_API_HOSTNAME = "http://127.0.0.1:8000"

export const PROD_API_HOSTNAME = "https://publico-ai.ew.r.appspot.com"

export const API_HOSTNAME = process.env.NODE_ENV === "production" ? PROD_API_HOSTNAME : LOCAL_API_HOSTNAME
