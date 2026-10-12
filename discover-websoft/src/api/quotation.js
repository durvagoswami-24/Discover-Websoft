import apiClient from "./client";

// Submits a quote request. Works for both guests and logged-in users --
// if the person is logged in, apiClient's interceptor already attaches
// their token, and the backend links the quotation to their account.
export async function submitQuotationRequest(payload) {
  const { data } = await apiClient.post("/quotations", payload);
  return data;
}
