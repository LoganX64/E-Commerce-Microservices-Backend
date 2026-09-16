export const getApiUrl = () => {
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "";
  }
  return process.env.NEXT_PUBLIC_API_URL || "";
};

export const API_URL = getApiUrl();
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

