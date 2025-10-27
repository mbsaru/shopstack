import { apiClient } from './apiClient';

const UI_CONFIG_API_BASE_URL = 'http://localhost:8000/api/ui-config';


export const fetchUiConfig = async (pathWithQuery, token) => {
  const endpoint = `${UI_CONFIG_API_BASE_URL}${pathWithQuery}`;
  return apiClient(endpoint, 'GET', null, token);
};


// export const fetchCartItems = async (token) => {
//   // This endpoint is relative to apiClient's base URL (http://localhost:8000/api/cart/)
//   return apiClient('/cart/', 'GET', null, token);
// };

// // Add other specific data fetching functions here as needed (e.g., fetchProductList, fetchCategories)
// // If these are driven by UI config, they might be handled by generic makeApiCall.
// // But if they are common data needed for entire sections, they can live here.