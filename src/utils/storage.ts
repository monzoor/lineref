export const BASE_PREFIX = 'lrl_';

export const setLSValue = (key: string, value: string) => {
  const val = JSON.stringify(value);
  localStorage.setItem(`${BASE_PREFIX}${key}`, val);
};

export const getLSValue = (key: string) => {
  const val = localStorage.getItem(`${BASE_PREFIX}${key}`) || '';

  try {
    return val ? JSON.parse(val) : val;
  } catch {
    console.log('error in data');
  }
};

export const removeLSValue = (key: string) =>
  localStorage.removeItem(`${BASE_PREFIX}${key}`);
