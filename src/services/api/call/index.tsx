import {callGetProfile, callLogin, callSignup} from './Authentication';
import {
  callGetRecipeDetails,
  callGetRecipes,
  callIdentifyFoodAndGenerateRecipe,
} from './RecipeGenerate';

export const ApiCall = {
  callSignup: callSignup,
  callLogin: callLogin,
  callGetProfile: callGetProfile,
  callIdentifyFoodAndGenerateRecipe: callIdentifyFoodAndGenerateRecipe,
  callGetRecipes: callGetRecipes,
  callGetRecipeDetails: callGetRecipeDetails,
};
