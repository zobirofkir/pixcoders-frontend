export const API_CONFIG = {
  BASE_URL: 'https://mediumvioletred-grouse-454147.hostingersite.com/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/me/logout',
      ME: '/auth/me',
      UPDATE_PROFILE: '/auth/me/update'
    },
  },
};

export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
