import Cookies from 'js-cookie';

export const getToken = (): string | undefined => {
  return Cookies.get('jwtToken');
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  
  return !!token;
};