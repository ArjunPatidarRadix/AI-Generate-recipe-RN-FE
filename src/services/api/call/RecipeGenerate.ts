import { api } from "..";
import { logError } from "../../../utils/logger";
import Request from "../apiRequester";
import { IRecipeData } from "../entities/IRecipe";

export const callIdentifyFoodAndGenerateRecipe = async (
  fromData: FormData
): Promise<any> => {
  try {
    Request.Instance.setLoader(false);
    const output = await api.identifyFoodAndGenerateRecipe(fromData);
    return output;
  } catch (error: any) {
    logError(error);
    return error;
  }
};

export const callGetRecipes = async (): Promise<IRecipeData[]> => {
  try {
    Request.Instance.setLoader(false);
    const output = await api.callGetRecipes();
    return output.data;
  } catch (error: any) {
    logError(error);
    return error;
  }
};

export const callGetRecipeDetails = async (
  id: string
): Promise<IRecipeData> => {
  try {
    Request.Instance.setLoader(false);
    const output = await api.callGetRecipeDetails(id);
    return output.data;
  } catch (error: any) {
    logError(error);
    return error;
  }
};
