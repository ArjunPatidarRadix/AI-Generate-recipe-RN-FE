import axios, {AxiosRequestHeaders, GenericAbortSignal} from 'axios';
import {BASE_URL, HOST} from './Constants';
import {
  NAVIGATION_TO_ALERT_DIALOG,
  NAVIGATION_TO_LOADER_VIEW,
} from '../../utils/constant/ScreenConstants';
import Logger from '../../utils/logger/apiLogger';
import {AppApiException} from './error/AppApiException';
import {LocalStorage} from '../storage';
import {Storage} from '../storage/Constants';
import {checkInternet, clearCachedData} from '../../utils/shared';
import {english} from '../../utils/strings';
import NetInfo from '@react-native-community/netinfo';
import {NETWORK_DISCONNECTED} from '../../utils/constant/AppConstants';
import {hideLoader, showDialog, showLoader} from '../context/CustomContext';

const url = (_url: string, appendInUrl?: string) =>
  `${BASE_URL}${_url}${appendInUrl || ''}`;

export type ContentType = 'JSON' | 'FORM_DATA' | 'MULTIPART_FORM_DATA';
export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch';

interface IHeader {
  'Content-Type': string;
  Host: string;
  Authorization?: string;
  refreshToken?: string;
}
interface IRequest {
  endpoint?: string;
  body?: {[key: string]: any} | null;
  headers?: {[key: string]: any} | null;
  method?: HttpMethod;
  appendInUrl?: string;
  params?: object | null;
  externalUrl?: string;
  signal?: GenericAbortSignal;
}
class Request {
  private static _instance: Request;
  private navigation: any | undefined;
  private dispatch: any | undefined;
  private showLoader!: boolean;
  private accessToken: string | undefined;
  private refreshToken: string | undefined;
  private loaderColor: string | undefined;
  private alertButtonColor: string | undefined;
  private showAlertDialog: boolean | undefined;

  /**
   * Initialization at app start up
   */
  public setNavigation(navigation: any) {
    this.navigation = navigation;
    this.showLoader = true;
    this.showAlertDialog = true;
  }
  /**
   * Initialize dispatch at app start
   * @param dispatch
   */
  public setDispatch(dispatch: any) {
    this.dispatch = dispatch;
  }
  /**
   * set loader flag for api calling
   * @param showLoader true if you want to show loader on api call
   */
  public setLoader(showLoader: boolean) {
    this.showLoader = showLoader;
  }
  /**
  @param loaderColor set color for the full screen loader on api call
  */
  public setLoaderColor(loaderColor: string | undefined) {
    this.loaderColor = loaderColor;
  }

  /**
   *
   * @param buttonColor set color for the button in the error alert screen
   */
  public setAlertButtonColor(buttonColor: string | undefined) {
    this.alertButtonColor = buttonColor;
  }

  /**
   *
   * @param showAlertDialog set whether to show alert window
   */
  public setShowAlertDialog(showAlertDialog: boolean | undefined) {
    this.showAlertDialog = showAlertDialog;
  }

  /**
   * set access token once received in login or sign up api
   * @param accessToken
   */
  public setOrUpdateTokens(
    accessToken: string | undefined,
    refreshToken: string | undefined,
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  send = async ({
    endpoint,
    body,
    headers,
    method,
    appendInUrl,
    params,
    externalUrl,
    signal,
  }: IRequest) => {
    const urlToUse = externalUrl
      ? externalUrl
      : endpoint && url(endpoint, appendInUrl || '');

    const header: IHeader = {
      'Content-Type': 'application/json',
      Host: HOST,
    };
    if (this.accessToken) {
      header.Authorization = `Bearer ${this.accessToken}`;
    }
    if (this.refreshToken) {
      header.refreshToken = this.refreshToken;
    }
    //checking the network connection if network is not available than do not hit server
    // const { isConnected, isInternetReachable } = await NetInfo.fetch();
    const {isConnected} = await NetInfo.fetch();
    if (isConnected !== (undefined || null)) {
      if (!isConnected) {
        throw new AppApiException(english.common.noInternetTitle);
      }
    }
    // const base64String = Base64.stringify(Utf8.parse(JSON.stringify(body)));
    const _params = {}; // method === 'get' ? { data: base64String } : null;

    Logger.describeRequest({
      url: urlToUse,
      method,
      headers: {...header, ...headers},
      params: {...params, ..._params},
      data: body,
    });

    // this.navigation &&
    //   this.showLoader &&
    //   this.navigation.navigate(NAVIGATION_TO_LOADER_VIEW, {
    //     ...(this.loaderColor && {color: this.loaderColor}),
    //   });

    this.showLoader && showLoader();

    try {
      const response = await axios({
        url: urlToUse,
        method: method || (body ? 'post' : 'get'),
        headers: {
          ...header,
          ...headers,
        },
        ...(body && {data: JSON.stringify(body)}),
        params: {...params, ..._params},
        transformRequest: [
          (data, _headers) => {
            this.updateTokens({headers: _headers});
            return data;
          },
        ],
        ...(signal && {signal: signal}),
      });
      Logger.describeSuccessResponse(response);
      // close loader
      // if (this?.navigation?.canGoBack()) {
      //   this.navigation && this.showLoader && this.navigation.pop();
      // }

      hideLoader();

      return response.data;
    } catch (error: any) {
      Logger.describeErrorResponse(error);
      // close loader
      // if (this?.navigation?.canGoBack()) {
      //   this.showLoader && this.navigation.pop();
      // }
      hideLoader();
      const {response} = error;

      // if api request not reached on server
      if (response === undefined) {
        if (error?.code === 'ERR_NETWORK') {
          checkInternet(NETWORK_DISCONNECTED);
        } else {
          this.showAlertDialog &&
            this.handleAPIError(error?.code, error?.message);
        }
        throw new AppApiException(error?.message, error?.code);
      }

      //Filter error response and show message accordingly
      switch (response?.status) {
        case 400:
          this.showAlertDialog &&
            this.handleAPIError(null, error.response.data.message);
          break;
        case 401: {
          clearCachedData();
          this.navigation.navigate('Login');
          break;
        }
        // session expired,logout alert
        case 502: {
          console.log('Network Error');
          break;
        }

        case 503: {
          console.log('Network Error');
          break;
        }
        default:
          this.showAlertDialog &&
            this.handleAPIError(
              null,
              error?.response?.data?.message ||
                'Internal server error! please try again',
            );
          break;
      }

      throw new AppApiException(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message,
        error?.response?.data?.code ? error?.response?.data?.code : error.code,
      );
    }
  };
  /**
   * Show the error message in custom alert box
   * @param title
   * @param message
   */
  handleAPIError(title: string | null, message: string) {
    // this.navigation &&
    //   this.navigation.navigate(NAVIGATION_TO_ALERT_DIALOG, {
    //     title: title,
    //     description: message,
    //     hideNegativeButton: true,
    //     dismissible: false,
    //     buttonStyle: {
    //       ...(this.alertButtonColor && {
    //         backgroundColor: this.alertButtonColor,
    //       }),
    //     },
    //   });

    showDialog({
      title: title || '',
      message: message,
      buttons: [{text: 'Okay'}],
    });
  }

  /**
   * update tokens in storages and request class
   * @param headers
   */
  updateTokens({
    headers,
    isForce = false,
  }: {
    headers?: AxiosRequestHeaders | undefined;
    isForce?: boolean;
  }) {
    if ((headers?.access_token || false) && (headers?.refresh_token || false)) {
      this.accessToken = headers.access_token;
      this.refreshToken = headers.refresh_token;
      isForce = true;
    }
    if (isForce) {
      LocalStorage.save(Storage.ACCESS_TOKEN, this.accessToken);
    }
  }
}

export default Request;
