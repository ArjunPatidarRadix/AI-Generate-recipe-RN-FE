import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = async (key: string, value: any) => {
  let valueToStore =
    typeof value === 'object' ? JSON.stringify(value) : `${value}`;
  return await AsyncStorage.setItem(key, valueToStore);
};

export const fetch = async (key: string, parse?: boolean) => {
  let value = await AsyncStorage.getItem(key);
  return parse && value ? JSON.parse(value) : value;
};

export const clear = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};

export const LocalStorage = {save, fetch, clear};
