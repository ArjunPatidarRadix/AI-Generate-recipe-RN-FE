import { HOST, PROD_HOST } from '../../services/api/Constants';

export const DEBUG_MODE = HOST !== PROD_HOST;

export const debug = DEBUG_MODE;

export const logMe = (data: any, prefix?: string) => {
  try {
    DEBUG_MODE &&
      console.log(
        `%cLOG ${prefix || ''} ${
          typeof data === 'string' ? data : JSON.stringify(data)
        }`,
        'color: blue; font-style: italic',
      );
  } catch (error) {
    DEBUG_MODE &&
      console.log(
        `%cLOG ${prefix || ''} ${data}`,
        'color: blue; font-style: italic',
      );
  }
};

export const logError = (data: any, prefix?: string) => {
  try {
    DEBUG_MODE &&
      console.log(
        `%cLOG ${prefix || ''} ${
          typeof data === 'string' ? data : JSON.stringify(data)
        }`,
        'color: red; font-style: italic',
      );
  } catch (error) {
    DEBUG_MODE &&
      console.log(
        `%cLOG ${prefix || ''} ${data}`,
        'color: red; font-style: italic',
      );
  }
};
