import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT, ERROR, LOADING, SUCCESS } from "../../../api/Constants";
import { getRecipes } from "./helper";
import { IRecipeData } from "../../../api/entities/IRecipe";

const RECIPES_DATA_SLICE_NAME = "recipesData";

export interface IRecipesDataType {
  recipesData: IRecipeData[];
  recipeDataStatus: string;
}

const initialState: IRecipesDataType = {
  recipesData: [],
  recipeDataStatus: DEFAULT,
};

const recipesDataSlice = createSlice({
  name: RECIPES_DATA_SLICE_NAME,
  initialState: initialState,
  reducers: {
    updateQuesion(state: IRecipesDataType, action) {
      if (action.payload) {
        state.recipesData = action.payload.data;
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.recipeDataStatus = LOADING;
        return state;
      })
      .addCase(getRecipes.fulfilled, (state: IRecipesDataType, action) => {
        if (action.payload) {
          state.recipesData = action.payload.result;
          state.recipeDataStatus = SUCCESS;
        } else {
          state.recipeDataStatus = ERROR;
        }
        return state;
      })
      .addCase(getRecipes.rejected, (state) => {
        state.recipeDataStatus = ERROR;
        return state;
      });
  },
});

export const { updateQuesion } = recipesDataSlice.actions;
export const recipesDataReducer = recipesDataSlice.reducer;
