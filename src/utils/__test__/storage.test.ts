import 'jest-localstorage-mock';

import {
  BASE_PREFIX,
  setLSValue,
  getLSValue,
  removeLSValue,
} from '@utils/storage';

const KEY_PLAIN = 'TEST';
const KEY = `${BASE_PREFIX}${KEY_PLAIN}`;
const KEY_VALUE_PLAIN = 'test value';
const KEY_VALUE = JSON.stringify(KEY_VALUE_PLAIN);

describe('Storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set correct value into localstorage', () => {
    setLSValue(KEY_PLAIN, KEY_VALUE_PLAIN);

    expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, KEY_VALUE);
  });

  it('should get correct value from localstorage', () => {
    setLSValue(KEY_PLAIN, KEY_VALUE_PLAIN);
    getLSValue(KEY_PLAIN);

    expect(localStorage.getItem).toHaveBeenLastCalledWith(KEY);
  });

  it('should get empty value when it does not exist', () => {
    const value = getLSValue(KEY_PLAIN);

    expect(localStorage.getItem).toHaveBeenLastCalledWith(KEY);
    expect(value).toEqual('');
  });

  it('should remove value from localstorage', () => {
    setLSValue(KEY_PLAIN, KEY_VALUE_PLAIN);
    removeLSValue(KEY_PLAIN);

    expect(localStorage.removeItem).toHaveBeenLastCalledWith(KEY);
    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  });
});
