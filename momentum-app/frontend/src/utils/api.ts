/**
 * Ümumi API sorğu funksiyası
 * @param {string} endpoint - Məsələn: '/tasks'
 * @param {object} options - method, body və s.
 */

interface ApiRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export const apiRequest = async (
  endpoint: string,
  { method = "GET", body, headers = {} }: ApiRequestOptions = {},
) => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  try {
    // Default başlıqlar (headers)
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
    };

    // Əgər body varsa (məsələn POST sorğusunda), onu JSON-a çevirib əlavə edirik
    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${baseUrl}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Something went wrong : ${response.status}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API Error :", error);
    throw error;
  }
};
