import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  NETWORK_CONNECTED,
  NO_NETWORK_DISPLAY_TIME,
} from '../constant/AppConstants';
import {Animated} from 'react-native';
import {Notifier} from 'react-native-notifier';
import {NoNetwokConnection} from '../../components/Toast/NoNetwokConnection';
import {clear, fetch, save} from '../../services/storage';
import Request from '../../services/api/apiRequester';

export async function clearCachedData() {
  Request.Instance.setOrUpdateTokens(undefined, undefined);
  Request.Instance.setLoader(false);
  removeToken();
}

export const internetReachable = async () => {
  const timeout = (milliseconds: number) =>
    new Promise(resolve => setTimeout(resolve, milliseconds));

  //let isInternetReachable: boolean | null = false;
  let isConnected: boolean | null = false;

  // isInternetReachable = (await NetInfo.fetch()).isInternetReachable;
  isConnected = (await NetInfo.fetch()).isConnected;

  // if (isInternetReachable) {
  //   return isInternetReachable && isConnected;
  // }

  await timeout(200);

  // isInternetReachable = (await NetInfo.fetch()).isInternetReachable;
  isConnected = (await NetInfo.fetch()).isConnected;

  // return isInternetReachable && isConnected;
  return isConnected;
};

export const getContainerStyleBottomPosition = (
  translateY: Animated.Value,
) => ({
  top: undefined,
  bottom: 20,
  transform: [
    {
      translateY: translateY.interpolate({
        inputRange: [-1000, 0],
        outputRange: [1000, 0],
        extrapolate: 'clamp',
      }),
    },
  ],
});

export const checkInternet = (networkStatus: string): boolean => {
  if (networkStatus !== NETWORK_CONNECTED) {
    Notifier.showNotification({
      duration: NO_NETWORK_DISPLAY_TIME,
      showAnimationDuration: 200,
      Component: NoNetwokConnection,
      hideOnPress: false,
      swipeEnabled: false,
      containerStyle: getContainerStyleBottomPosition,
    });
    return false;
  }
  return true;
};

export const isString = (a: any) => {
  return typeof a === 'string';
};

export const isNonEmptyString = (a: any): boolean => {
  return !!(isString(a) && a !== '');
};

export function storeToken(token: string) {
  save('accessToken', token);
}

export function removeToken() {
  clear('accessToken');
}

export async function getToken(): Promise<string> {
  return await fetch('accessToken');
}
