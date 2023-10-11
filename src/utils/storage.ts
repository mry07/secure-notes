import AsyncStorage from '@react-native-async-storage/async-storage';
import { Key } from './storage.types';

export const setStorage = async (k: Key, v: any) => {
  try {
    await AsyncStorage.setItem(k, JSON.stringify(v));
  } catch (error) {
    if (__DEV__) console.error(error);
  }
};

export const getStorage = async (k: Key) => {
  try {
    const value = await AsyncStorage.getItem(k);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    if (__DEV__) console.error(error);
    return null;
  }
};

export const clearStorage = async (except: Key[] = []) => {
  try {
    if (except.length > 0) {
      const keys = (await AsyncStorage.getAllKeys()) as Key[];
      for (const key of keys) {
        if (except.indexOf(key) === -1) {
          await AsyncStorage.removeItem(key);
        }
      }
    } else {
      await AsyncStorage.clear();
    }

    return true;
  } catch (error) {
    if (__DEV__) console.error(error);
    return false;
  }
};
