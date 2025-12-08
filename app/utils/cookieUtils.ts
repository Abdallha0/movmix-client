import { setCookie, getCookie, deleteCookie } from 'cookies-next';


// Cookie configuration
const COOKIE_CONFIG = {
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const, // الحماية من هجمات CSRF
  //httpOnly: true // الأهم: منع الوصول عبر JavaScript
};

// Token management
export const setToken = (token: string) => {
  setCookie("token", token, COOKIE_CONFIG);
};

export const getToken = () => {
  const token = getCookie("token") as string | null;
  return token ?? null
};

export const removeToken = () => {
  deleteCookie("token");
};

// User name management
export const setUserName = (name: string) => {
  setCookie("userName", name, COOKIE_CONFIG);
};

export const getUserName = () => {
  return getCookie("userName") as string | undefined;
};

export const removeUserName = () => {
  deleteCookie("userName");
};

// Auth type management
export const setAuthType = (type: string) => {
  setCookie("authType", type, COOKIE_CONFIG);
};

export const getAuthType = () => {
  return getCookie("authType") as string | undefined;
};

export const removeAuthType = () => {
  deleteCookie("authType");
};

// Clear all auth-related cookies
export const clearAuthCookies = () => {
  removeToken();
  removeUserName();
  removeAuthType();
}; 
