import apiInstance from "../../utils/axios"

export const createPaymentCartCheckout = async (payload) => {
  return await apiInstance.post("/payment/create", payload)
}
