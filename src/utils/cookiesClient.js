import Cookies from 'js-cookie';

export const setItem = (key, value) => {
  Cookies.set(key, value);
};

export const removeItem = (key) => {
  Cookies.remove(key);
};
