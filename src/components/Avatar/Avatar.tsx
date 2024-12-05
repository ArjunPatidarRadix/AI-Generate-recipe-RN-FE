import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import TouchableReceptor from '../TouchReceptor/TouchReceptor';
import {colors} from '../../theme/colors';
import AsyncImage, {ImageMode} from '../AsyncImage/AsyncImage';

export type AvatarSize =
  | 'ssm'
  | 'xSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge';

const avatarSizes = {
  small: moderateScale(40),
  ssm: moderateScale(48),
  medium: moderateScale(64),
  large: moderateScale(80),
  xlarge: moderateScale(150),
  xSmall: moderateScale(20),
};

interface IAvatar {
  source: any;
  imageProps?: any;
  onPress?: any;
  containerStyle?: object;
  imageStyle?: object;
  size?: AvatarSize;
  rounded?: boolean;
  showLoaderAnimation?: boolean;
  resizeMode?: ImageMode;
  onError?: () => void;
  showImageSkeleton?: boolean;
  testID?: string;
}

// NOTE: We are not using TouchableReceptor for this component
const Avatar = ({
  /**
   * Image source
   */
  source = null,
  /**
   * Optional properties to pass to the avatar e.g "resizeMode"
   */
  imageProps = {},
  /**
   * Callback to call when Avatar is clicked
   */
  onPress = null,
  /**
   * Styling for the entire container that wrap Avatar
   */
  containerStyle = {},
  /**
   * Image style
   */
  imageStyle = {},
  /**
   * Size of the Avatar, can either be a number or
   * one of the string from 'small', 'medium', 'large', 'xlarge'
   *
   * @default is 'small'
   */
  size = 'small',
  /**
   * Should Avatar be round in shape
   */
  rounded = false,
  /**
   * whether to show loader animation in image
   */
  showLoaderAnimation = false,
  resizeMode = 'cover',
  showImageSkeleton = false,
  onError,
  testID,
}: IAvatar) => {
  const width =
    typeof size === 'number' ? size : avatarSizes[size] || avatarSizes.small;
  const height = width;

  const Component = onPress ? TouchableReceptor : View;

  return (
    <Component
      disableBlurEffect
      onPress={onPress}
      style={StyleSheet.flatten([
        styles.container,
        {width, height},
        {overflow: 'hidden'},
        rounded && {borderRadius: width / 2},
        containerStyle,
      ])}>
      <>
        {!source ? null : (
          <View
            style={{
              ...(rounded && {borderRadius: width / 2, overflow: 'hidden'}),
            }}>
            {source?.uri?.length > 0 ? (
              <AsyncImage
                resizeMode={resizeMode}
                targetURL={source?.uri}
                {...imageProps}
                style={StyleSheet.flatten([
                  styles.avatar,
                  {width, height},
                  rounded && {borderRadius: width / 2},
                  imageProps.style || {},
                  imageStyle,
                ])}
                showLoadingAnimation={showLoaderAnimation}
                onError={() => {
                  onError && onError();
                }}
                showImageSkeleton={showImageSkeleton}
                testID={testID}
              />
            ) : (
              <Image
                source={require('./../../assets/images/default-image.jpg')}
                resizeMode="contain"
                {...imageProps}
                style={StyleSheet.flatten([
                  styles.avatar,
                  {width, height},
                  rounded && {borderRadius: width / 2},
                  imageProps.style || {},
                  styles.defaultImage,
                  imageStyle,
                ])}
                testID={testID}
              />
            )}
          </View>
        )}
      </>
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    flex: 1,
  },
  defaultImage: {
    tintColor: colors.grayColor,
    backgroundColor: colors.whiteTextColor,
  },
});

export default Avatar;
