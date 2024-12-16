// update this flag for testing and prod server
const isProd = false;

// export const TEST_HOST = 'https://4498-103-247-54-188.ngrok-free.app';
// 192.168.0.104
export const TEST_HOST = 'http://10.0.2.2:3030';
// export const TEST_HOST = 'http://192.168.0.104:3030';

export const PROD_HOST = 'http://localhost:3030';

export let HOST = isProd ? PROD_HOST : TEST_HOST;

const ENDPOINT_PATH = '/api/';

export const BASE_URL = HOST + ENDPOINT_PATH;

export const UPLOAD_BASE_URL = HOST + ENDPOINT_PATH;

// export const IMAGE_BASE_URL = 'http://localhost:3030/'; //127.0.0.1
export const IMAGE_BASE_URL = 'http://10.0.2.2:3030/';

export const ENDPOINTS = {
  getRecipes: 'recipes',
  getRecipe: 'recipe',
  signup: 'user/signup',
  login: 'user/login',
  myProfile: 'user/myProfile',
};

export const DEFAULT = 'default';
export const LOADING = 'loading';
export const SUCCESS = 'success';
export const ERROR = 'error';

export const STATUS_FOLLOW = 'follow';
export const STATUS_UN_FOLLOW = 'unFollow';

export const SOCIAL_FEED_PAGE_LIMIT = 20;
