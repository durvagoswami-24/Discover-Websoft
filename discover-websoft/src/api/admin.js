import axios from "axios";

const ADMIN_TOKEN_KEY = "dw_admin_token";

const adminClient = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000/api"),
});

adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the admin token is invalid/expired, any protected call will 401 --
// clear it so the app falls back to the login screen instead of getting
// stuck retrying with a dead token.
adminClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
    }
    return Promise.reject(err);
  }
);

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export async function adminLoginRequest(securityKey) {
  const { data } = await adminClient.post("/admin/login", { securityKey });
  return data.token;
}

export async function fetchQuotations() {
  const { data } = await adminClient.get("/quotations");
  return data.quotations;
}

export async function fetchQuotation(id) {
  const { data } = await adminClient.get(`/quotations/${id}`);
  return data.quotation;
}

export async function updateQuotationStatus(id, status) {
  const { data } = await adminClient.patch(`/quotations/${id}/status`, {
    status,
  });
  return data.quotation;
}

// Sends (or resends) the quotation + terms & conditions to the customer
// by email, with an optional note attached -- e.g. a summary of a call
// or in-person discussion. The note is saved on the quotation too, so
// it's visible next time this record is opened.
export async function sendQuotationToCustomer(id, adminNote) {
  const { data } = await adminClient.post(`/quotations/${id}/send`, {
    adminNote,
  });
  return data.quotation;
}

// Downloads the quotation PDF and triggers a save-file prompt in the
// browser. Uses the admin-authenticated axios instance directly (rather
// than a plain <a href>) since the endpoint requires a Bearer token.
export async function downloadQuotationPdf(id) {
  const response = await adminClient.get(`/quotations/${id}/pdf`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `quotation-${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
