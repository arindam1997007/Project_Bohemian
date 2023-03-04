// Collections Name
export const USER_COLLECTION = "users"
export const PRODUCT_COLLECTION = "products"
export const PRODUCT_DETAILS_SUB_COLLECTION = (name) => {
  return `${PRODUCT_COLLECTION}/${name}/productDetails`
}
export const USER_ORDER_SUB_COLLECTION = (userId) => {
  return `${USER_COLLECTION}/${userId}/orders`
}
