export const API_CONFIG = {
  BASE_URL: 'http://localhost/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/me/logout'
    },
  },
};

export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
