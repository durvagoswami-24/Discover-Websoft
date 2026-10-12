import apiClient from "./client";

export async function registerRequest({ name, email, phone, password }) {
  const { data } = await apiClient.post("/auth/register", {
    name,
    email,
    phone,
    password,
  });
  return data; // { token, user }
}

export async function loginRequest({ email, password }) {
  const { data } = await apiClient.post("/auth/login", { email, password });
  return data; // { token, user }
}

export async function getMeRequest() {
  const { data } = await apiClient.get("/auth/me");
  return data; // { user }
}
