import axios from 'axios'

export const fetchCustomer = async () => {
  let response = await axios.get("Customers/GetCustomer")
    return response.data
  };