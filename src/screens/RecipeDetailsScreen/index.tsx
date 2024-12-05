import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ApiCall} from '../../services/api/call';
import {IRecipeData} from '../../services/api/entities/IRecipe';
import {AppApiException} from '../../services/api/error/AppApiException';
import Request from '../../services/api/apiRequester';
import Text from '../../components/Text/Text';
import {ScreenContainer} from '../../components/templates/ScreenContainer';
import AsyncImage from '../../components/AsyncImage/AsyncImage';
import {IMAGE_BASE_URL} from '../../services/api/Constants';
import {moderateScale} from 'react-native-size-matters';
import {marginSizes} from '../../theme/sizes';

interface IRecipeDetailsProps {
  recipeId: string;
}
interface IProps {
  navigation: any;
  route: {params: IRecipeDetailsProps};
}

const RecipeDetailsScreen = ({navigation, route}: IProps) => {
  const {recipeId} = route.params;

  console.log('recipeId:: ' + recipeId);

  const [recipeData, setRecipeData] = useState<IRecipeData | undefined>(
    undefined,
  );
  useEffect(() => {
    async function getRecipeDetails() {
      if (recipeId) {
        Request.Instance.setLoader(true);
        const result = await ApiCall.callGetRecipeDetails(recipeId);
        Request.Instance.setLoader(false);
        if (!(result instanceof AppApiException)) {
          setRecipeData(result);
        }
      }
    }
    getRecipeDetails();
  }, []);

  return (
    <ScreenContainer>
      <ScrollView>
        <>
          <AsyncImage
            targetURL={`${IMAGE_BASE_URL}${recipeData?.imagePath}`}
            resizeMode="cover"
            style={{
              width: '100%',
              height: moderateScale(180),
              borderRadius: moderateScale(10),
              marginBottom: moderateScale(10),
            }}
          />
          {recipeData ? (
            <View style={{marginTop: marginSizes.md}}>
              <Text type="largeBold">Identified Food</Text>
              <Text type="small">{recipeData?.recipeName}</Text>
              <Text
                containerStyle={{marginTop: marginSizes.md}}
                type="largeBold">
                Generated Recipe
              </Text>
              <Text type="small">{recipeData?.recipeDetails}</Text>
            </View>
          ) : (
            <View></View>
          )}
        </>
      </ScrollView>
    </ScreenContainer>
  );
};

export default RecipeDetailsScreen;
