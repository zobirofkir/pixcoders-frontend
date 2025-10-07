import Cookies from 'js-cookie';

const COOKIE_NAMES = {
  ACCESS_TOKEN: 'accessToken',
};

const COOKIE_OPTIONS = {
  expires: 365, 
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

export const setAuthToken = (token) => {
  if (!token) return;
  Cookies.set(COOKIE_NAMES.ACCESS_TOKEN, token, COOKIE_OPTIONS);};

export const getAuthToken = () => {
  return Cookies.get(COOKIE_NAMES.ACCESS_TOKEN);};

export const removeAuthToken = () => {
  Cookies.remove(COOKIE_NAMES.ACCESS_TOKEN, COOKIE_OPTIONS);};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
