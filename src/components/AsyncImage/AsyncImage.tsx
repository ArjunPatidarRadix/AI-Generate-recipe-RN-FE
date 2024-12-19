import React, {useState, FC, Fragment} from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import FastImage, {FastImageProps, ImageStyle} from 'react-native-fast-image';
import {logError} from '../../utils/logger/index';
import {colors} from '../../theme/colors/index';
import {MaterialIndicator} from 'react-native-indicators';
import {paddingSizes} from '../../theme/sizes';
import {moderateScale} from 'react-native-size-matters';
import {isNonEmptyString} from '../../utils/shared';

export type ImageMode = 'cover' | 'contain' | 'stretch' | 'center';
type FastImagePriority = 'low' | 'normal' | 'high';

interface IAsyncImage extends Omit<FastImageProps, 'source'> {
  targetURL: string;
  allowDynamicSizing?: boolean;
  NoPhoto?: boolean;
  resizeMode?: ImageMode;
  priority?: FastImagePriority;
  style: ImageStyle;
  showLoadingAnimation?: boolean;
  loadingStyle?: {};
}
interface IServePlaceHolderImageComponentType {
  style: ViewStyle;
  NoPhoto: boolean;
}

interface IServeLoadingImageComponentType {
  style: ViewStyle;
  loadingStyle: {};
}

interface IBeginLoadingAsyncImageType {
  targetURL: string;
  priority: FastImagePriority;
  resizeMode: ImageMode;
  style: {};
  setImageLoadError: (value: React.SetStateAction<boolean>) => void;
  setIsImageLoadComplete: (value: React.SetStateAction<boolean>) => void;
  setIsImageLoading: (value: React.SetStateAction<boolean>) => void;
  isImageLoadComplete: boolean;
  props: {};
}

const getResizeMode = (mode: ImageMode) => {
  switch (mode) {
    case 'cover':
      return FastImage.resizeMode.cover;
    case 'contain':
      return FastImage.resizeMode.contain;
    case 'stretch':
      return FastImage.resizeMode.stretch;
    case 'center':
      return FastImage.resizeMode.center;
    default:
      return FastImage.resizeMode.cover;
  }
};

export const ServePlaceHolderImageComponent: React.FC<
  IServePlaceHolderImageComponentType
> = ({style, NoPhoto}: IServePlaceHolderImageComponentType) => {
  const placeholderImage = NoPhoto
    ? require('../../assets/images/default-image.jpg')
    : require('../../assets/images/default-image.jpg');
  return <Image style={[style]} source={placeholderImage} />;
};

export const ServeLoadingImageComponent: React.FC<
  IServeLoadingImageComponentType
> = ({style, loadingStyle}: IServeLoadingImageComponentType) => {
  return (
    <View
      style={{
        ...style,
        ...styles.loadingIndicatorContainer,
        ...loadingStyle,
      }}>
      <MaterialIndicator color={colors.secondaryAppColor} />
    </View>
  );
};

export const BeginLoadingAsyncImage: React.FC<IBeginLoadingAsyncImageType> = ({
  targetURL,
  priority,
  resizeMode,
  style,
  setImageLoadError,
  setIsImageLoadComplete,
  setIsImageLoading,
  isImageLoadComplete,
  props,
}: IBeginLoadingAsyncImageType) => {
  const imageFetchData = {
    uri: targetURL,
    priority,
  };
  const MAX_RELOAD_FAST_IMAGE = 2;
  const [fastImageKey, setFastImageKey] = useState(1);
  return (
    <FastImage
      style={[style]}
      source={imageFetchData}
      resizeMode={getResizeMode(resizeMode)}
      onLoadStart={() => {
        setImageLoadError(false);
        setIsImageLoadComplete(false);
        setIsImageLoading(true);
      }}
      onLoad={_dimensions => {
        if (!isImageLoadComplete) {
          setIsImageLoadComplete(true);
          setIsImageLoading(false);
        }
      }}
      onError={() => {
        setIsImageLoadComplete(false);
        setIsImageLoading(false);
        setImageLoadError(true);
        if (fastImageKey < MAX_RELOAD_FAST_IMAGE) {
          setFastImageKey(fastImageKey + 1);
        } else {
          logError(imageFetchData, 'image loading error');
        }
      }}
      key={fastImageKey + targetURL}
      {...props}
    />
  );
};
/**
 * Use this component to load image over a url,
 * use Image component from "react-native" package to show local image
 *
 * Documentation: https://github.com/DylanVann/react-native-fast-image
 */
const AsyncImage: FC<IAsyncImage> = ({
  /**
   *  url of of the image
   */
  targetURL,
  /**
   * resize mode : Can contain any one of the four values
   * 1. contain - Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the view (minus padding).
   * 2. cover   - Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view (minus padding).
   * 3. stretch - Scale width and height independently, This may change the aspect ratio of the src.
   * 4. center  - Do not scale the image, keep centered.
   *
   * @default value is contain
   */
  resizeMode = 'contain',
  NoPhoto = false,
  /**
   * Contain any one of the value
   * 1. FastImage.priority.low
   * 2. FastImage.priority.normal
   * 3. FastImage.priority.high
   *
   * @default value is FastImage.priority.normal
   */
  priority = FastImage.priority.high,
  /**
   * image style
   */
  style,
  /**
   * prop to control visibility of the loading animation
   */
  showLoadingAnimation = true,
  loadingStyle = {},
  ...props
}) => {
  const [isImageLoadComplete, setIsImageLoadComplete] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageLoadError, setImageLoadError] = useState(false);

  return (
    <>
      {/* fallback image and loader is showing below actual image  */}
      {isNonEmptyString(targetURL) ? (
        <Fragment>
          {/* in case of image loading */}

          {showLoadingAnimation && isImageLoading && !isImageLoadComplete ? (
            <ServeLoadingImageComponent
              style={style}
              loadingStyle={loadingStyle}
            />
          ) : null}
          {/* In case of image loading failed */}
          {isImageLoadComplete || isImageLoading ? null : (
            <ServePlaceHolderImageComponent style={style} NoPhoto={NoPhoto} />
          )}
          {/* image loaded successfully -> there is no image error*/}
          {!imageLoadError ? (
            <BeginLoadingAsyncImage
              targetURL={targetURL}
              priority={priority}
              resizeMode={resizeMode}
              style={style}
              setImageLoadError={setImageLoadError}
              setIsImageLoadComplete={setIsImageLoadComplete}
              setIsImageLoading={setIsImageLoading}
              isImageLoadComplete={isImageLoadComplete}
              props={props}
            />
          ) : null}
        </Fragment>
      ) : (
        <ServePlaceHolderImageComponent style={style} NoPhoto={NoPhoto} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingIndicatorContainer: {
    position: 'absolute',
    padding: paddingSizes.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSkeleton: {
    width: moderateScale(50),
    height: moderateScale(50),
  },
});

export default AsyncImage;
