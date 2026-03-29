const API_BASE_URL = "http://localhost:3001/api";

type RequestOptions = RequestInit & {
  errorMessage?: string;
};

export const request = async <T>(
  path: string,
  options?: RequestOptions,
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(options?.errorMessage ?? "Request failed");
  }

  return response.json() as Promise<T>;
};
