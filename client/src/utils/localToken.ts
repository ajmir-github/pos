const LocalTokenKey = "Token";
export const getLocalToken = () => localStorage.getItem(LocalTokenKey);
export const setLocalToken = (token: string) =>
  localStorage.setItem(LocalTokenKey, token);
export const clearLocalToken = () => localStorage.removeItem(LocalTokenKey);
export const hasLocalToken = () => getLocalToken() !== null;
