import {FlatList, View} from 'react-native';
import React, {useEffect} from 'react';
import {Button} from '../../components/button/Button';
import {ScreenContainer} from '../../components/templates/ScreenContainer';
import Text from '../../components/Text/Text';
import {useDispatch, useSelector} from 'react-redux';
import {IStore} from '../../services/redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getRecipes} from '../../services/redux/slices/recipesSection/helper';
import {useIsFocused} from '@react-navigation/native';
import TouchReceptor from '../../components/TouchReceptor/TouchReceptor';
import AsyncImage from '../../components/AsyncImage/AsyncImage';
import {IMAGE_BASE_URL} from '../../services/api/Constants';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
import {marginSizes, paddingSizes} from '../../theme/sizes';
import {styles} from '../SignupScreen/styles';
import PressableText from '../../components/Text/PressableText';

const HistoryScreen = ({navigation}: any) => {
  const {recipesData} = useSelector((state: IStore) => state.recipesData);
  const isFocused = useIsFocused();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    if (isFocused) {
      dispatch(getRecipes());
    }
  }, [isFocused]);

  const onRecipeClickHandler = (id: string) => {
    navigation.navigate('RecipeDetails', {
      recipeId: id,
    });
  };

  return (
    <ScreenContainer>
      <Text
        containerStyle={{
          paddingVertical: paddingSizes.md,
          borderBottomWidth: 1,
          borderBottomColor: colors.grayColor,
        }}
        type="newH5">
        Generated Recipe History
      </Text>

      <FlatList
        data={recipesData}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id.toString()}
        style={{marginTop: marginSizes.md}}
        renderItem={({item}) => {
          return (
            <TouchReceptor
              key={item._id}
              onPress={() => onRecipeClickHandler(item._id)}
              style={[
                {
                  width: '100%',
                  height: moderateScale(80),
                  backgroundColor: colors.whiteTextColor,
                  overflow: 'hidden',
                  shadowColor: colors.grayColor,
                  marginBottom: marginSizes.md,
                  flexDirection: 'row',
                },
                styles.boxShadow,
              ]}>
              <AsyncImage
                targetURL={`${IMAGE_BASE_URL}${item.imagePath}`}
                resizeMode="cover"
                style={{
                  width: moderateScale(100),
                  height: '100%',
                  borderRadius: moderateScale(10),
                  marginBottom: moderateScale(10),
                }}
              />
              <PressableText
                style={{
                  flex: 1,
                  flexWrap: 'wrap',
                  marginStart: marginSizes.md,
                  marginVertical: marginSizes.sm,
                }}
                type="medium">
                {item.recipeName}
              </PressableText>
            </TouchReceptor>
          );
        }}
      />
    </ScreenContainer>
  );
};

export default HistoryScreen;
