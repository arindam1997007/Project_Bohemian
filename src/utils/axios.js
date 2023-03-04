import axios from "axios"

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_STAGING_BASE_URL,
})

export default apiInstance
