'use server';

import { cookies } from 'next/headers';

export const setItem = async (key, value) => {
  cookies().set(key, value);
};

export const getItem = async (key) => {
  const item = cookies().get(key);
  return item ? item.value : null;
};

export const removeItem = async (key) => {
  cookies().delete(key);
};
