import {api} from '..';
import {logError} from '../../../utils/logger';
import {hideLoader, showLoader} from '../../context/CustomContext';
import {IRecipeData} from '../entities/IRecipe';

export const callIdentifyFoodAndGenerateRecipe = async (
  fromData: FormData,
): Promise<any> => {
  try {
    showLoader();
    const output = await api.identifyFoodAndGenerateRecipe(fromData);
    hideLoader();
    return output;
  } catch (error: any) {
    logError(error);
    return error;
  }
};

export const callGetRecipes = async (): Promise<IRecipeData[]> => {
  try {
    const output = await api.callGetRecipes();
    return output.data;
  } catch (error: any) {
    logError(error);
    return error;
  }
};

export const callGetRecipeDetails = async (
  id: string,
): Promise<IRecipeData> => {
  try {
    const output = await api.callGetRecipeDetails(id);

    return output.data;
  } catch (error: any) {
    logError(error);
    return error;
  }
};
