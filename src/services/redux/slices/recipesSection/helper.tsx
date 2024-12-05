import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCall} from '../../../api/call';
import {AppApiException} from '../../../api/error/AppApiException';
import Request from '../../../api/apiRequester';

const GET_RECIPES = 'getRecipes';

export const getRecipes = createAsyncThunk(GET_RECIPES, async () => {
  Request.Instance.setLoader(true);

  const result = await ApiCall.callGetRecipes();
  Request.Instance.setLoader(false);

  if (!(result instanceof AppApiException)) {
    return {
      result,
    };
  }
});
