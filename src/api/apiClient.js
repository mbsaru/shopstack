import { UiConfig } from "./Config";
const getBaseUrl = (isServer = false) => {
  if (isServer) {
    
    return process.env.DJANGO_BACKEND_URL || 'http://localhost:8000';
  }
  return '/api/proxy';
};

export const apiClient = async (endpoint, method = 'GET', data = null, token = null, isServer = false) => {
  const baseUrl = getBaseUrl(isServer);
  console.log('called api client',baseUrl)
  console.log('end point',endpoint)
  const url = `${baseUrl}${endpoint}`; 

  console.log('url',url)
  if (url === '/api/proxy/auth/login/'){
    return {
      "tokenField": "access",
      "userField": "user",
      "redirect": "/product",
      "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": "user"
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Token ${token}` }), 
  };

  const config = {
    method,
    headers,
    ...(data && (method === 'POST' || method === 'PUT' || method === 'PATCH') && { body: JSON.stringify(data) }),
  };

  try {
    // const response = await fetch(url, config);

    // if (!response.ok) {
    //   let errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
    //   throw new Error(errorData.detail || errorData.message || response.statusText);
    // }

    // // Handle 204 No Content for successful operations that don't return data (e.g., deletions)
    // if (response.status === 204) {
    //   return null;
    // }

    // Parse and return the JSON response for other successful operations
    // return await response.json();
    console.log('url',url)
    const template = UiConfig[url]
    if (template){
      return template
    }
    return 
  } catch (error) {
    console.error('API Client Error:', error);
    throw error; 
  }
};