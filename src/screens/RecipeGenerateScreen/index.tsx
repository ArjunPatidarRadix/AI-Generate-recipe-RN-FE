import {View, Alert, Linking, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {ScreenContainer} from '../../components/templates/ScreenContainer';
import Icon from '../../components/Icons/Icon';
import {moderateScale} from 'react-native-size-matters';
import {Button} from '../../components/button/Button';
import {marginSizes, paddingSizes} from '../../theme/sizes';
import {ApiCall} from '../../services/api/call';
import {english} from '../../utils/strings';
import {logError, logMe} from '../../utils/logger';
import ImagePicker from 'react-native-image-crop-picker';
import Text from '../../components/Text/Text';
import {NAVIGATION_TO_ALERT_DIALOG} from '../../utils/constant/ScreenConstants';
import Avatar from '../../components/Avatar/Avatar';
import {colors} from '../../theme/colors';
import {showDialog} from '../../services/context/CustomContext';

type RecipeData = {
  recipeName: string;
  recipe: string;
};

type TImage = {
  filename: string;
  height: number;
  mime: string;
  modificationDate: string;
  path: string;
  size: number;
  width: number;
};
const RecipeGenerateScreen = ({navigation}: any) => {
  const [isLoading, setLoading] = useState(false);
  // const [recipeData, setRecipeData] = useState<RecipeData | undefined>({
  //   recipeName: 'Pizza',
  //   recipe:
  //     'what is the detailed recipe for a pepperoni pizza on a wooden cutting board ? Some people might think of wooden cutting boards as kitchen decor items rather than functional tools for food preparation, but they are indeed very useful for many kitchen tasks, including preparing pizzas. Using a wooden cutting board to shape and top a pizza dough can give the dough a unique texture and infuses it with a subtle wood aroma.\n' +
  //     '\n' +
  //     '### Ingredients for Pepperoni Pizza:\n' +
  //     '\n' +
  //     '#### Base:\n' +
  //     '- 1 lb (450g) pizza dough (homemade or store-bought)\n' +
  //     '- 2 tbsp olive oil',
  // });
  const [recipeData, setRecipeData] = useState<RecipeData | undefined>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );

  const runOnResponse = async (image: any) => {
    console.log('image:: ', image);
    if (image.path) {
      // dispaly image in UI
      // updateImage(image.path);
      // updateFile(image);
      setSelectedImage(image.path);
      callGenerateRecipeApi(image);
    }
    logMe(image, ' IMAGE CROP PICKER RESPONSE');
  };

  // const handleShowDialog = () => {
  //   showDialog({
  //     title: 'Confirmation',
  //     message: 'Are you sure you want to proceed?',
  //     buttons: [
  //       {text: 'Cancel', onPress: () => console.log('Cancelled')},
  //       {text: 'Confirm', onPress: () => console.log('Confirmed')},
  //       {text: 'Confirm', onPress: () => console.log('Confirmed')},
  //     ],
  //   });
  // };

  const openCameraPicker = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropperChooseText: 'SELECT',
      cropperCancelText: 'CANCEL',
      cropperToolbarTitle: '',
      loadingLabelText: '',
      compressImageQuality: 1,
      cropperToolbarColor: 'white',
    })
      .then(runOnResponse)
      .catch((err: any) => {
        runOnError(err);
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropperChooseText: 'SELECT',
      cropperCancelText: 'CANCEL',
      hideBottomControls: true,
      cropperToolbarTitle: '',
      loadingLabelText: '',
      compressImageQuality: 1,
      cropperToolbarColor: 'white',
    })
      .then(runOnResponse)
      .catch((err: any) => {
        runOnError(err);
        if (err.code === 'E_NO_LIBRARY_PERMISSION') {
          Alert.alert(
            english.common.pleaseAllowStoragePermissionHeader,
            english.common.pleaseAllowStoragePermission,
            [
              {
                text: english.common.defaultAlertCancelButtonText,
              },
              {
                text: english.common.defaultAlertAllowButtonText,
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
      });
  };

  const runOnError = (err: any) => {
    console.log('error:: ', err);
    logError(err, 'ERROR IMAGE PICKER');
  };

  const callGenerateRecipeApi = async (image: TImage) => {
    // const url = URL.createObjectURL(blob);
    const formData = new FormData();

    var img = {
      uri: image.path,
      name: image.filename,
      type: image.mime,
    };
    formData.append('image', img);
    formData.append('size', image.size.toString());

    try {
      setLoading(true);
      console.log('formData: ', formData);
      const response = await ApiCall.callIdentifyFoodAndGenerateRecipe(
        formData,
      );
      console.log('🚀 ~ response:', response);

      if (response.data) {
        setRecipeData(response.data);
      }
    } catch (error: any) {
      console.log('error', error);
      const msg = error?.response?.data?.message
        ? error.response.data.message
        : error.message;

      showDialog({
        title: 'Error',
        message: msg,
        buttons: [{text: 'Okay'}],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView>
        <>
          <Text
            type="newH4"
            containerStyle={{
              paddingVertical: paddingSizes.md,
              borderBottomWidth: 1,
              borderBottomColor: colors.grayColor,
            }}>
            Identify Your Food
          </Text>

          <Text type="small" containerStyle={{marginVertical: marginSizes.sm}}>
            Take a photo or upload an image of your food, and we'll identify it
            and generate a delicious recipe for you!
          </Text>
          <View style={styles.imageBg}>
            {selectedImage ? (
              <Image
                source={{uri: selectedImage}}
                resizeMode="contain"
                style={[styles.image]}
              />
            ) : (
              <Icon
                containerStyle={{
                  width: moderateScale(24),
                }}
                type="material"
                name="add-photo-alternate"
              />
            )}
          </View>
          <Button
            title="Upload a image"
            onPress={choosePhotoFromLibrary}
            size="sm"
            style={styles.buttonStyle}
          />
          <Button
            title="Capture image"
            onPress={openCameraPicker}
            size="sm"
            style={styles.buttonStyle}
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
              <Text type="small">{recipeData?.recipe}</Text>
            </View>
          ) : (
            <></>
          )}
        </>
      </ScrollView>
    </ScreenContainer>
  );
};

export default RecipeGenerateScreen;
