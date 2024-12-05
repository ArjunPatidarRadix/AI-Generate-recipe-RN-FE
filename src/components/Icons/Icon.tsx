import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacityProps,
  ImageSourcePropType,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../../theme/colors';
import {iconSizes} from '../../theme/sizes';
import {CustomIndicator} from '../CustomIndicator';
import TouchReceptor from '../TouchReceptor/TouchReceptor';
import getIconType from './getIconType';

export type IconTypes =
  | 'zocial'
  | 'octicon'
  | 'material'
  | 'material-community'
  | 'ionicon'
  | 'foundation'
  | 'evilicon'
  | 'entypo'
  | 'font-awesome'
  | 'font-awesome-5'
  | 'fontisto'
  | 'simple-line-icon'
  | 'feather'
  | 'antdesign';
export interface IIcon extends TouchableOpacityProps {
  name?: string;
  type?: IconTypes;
  source?: ImageSourcePropType;
  Svg?: any;
  svgColor?: string;
  disabled?: boolean;
  size?: number;
  color?: string;
  onPress?: () => void;
  iconStyle?: object;
  imageStyle?: object;
  imageTintColor?: string;
  rounded?: boolean;
  loading?: boolean;
  opacity?: number;
  containerStyle?: ViewStyle;
}

const Icon: React.FC<IIcon> = ({
  /**
   * type of icon set. Available Icon set are
   * - material
   * - material-community
   * - font-awesome
   * - font-awesome-5
   * - octicon
   * - ionicon
   * - foundation
   * - evilicon
   * - simple-line-icon
   * - zocial
   * - entypo
   * - feather
   * - antdesign
   * - fontisto
   *
   * Default value is 'material'
   */
  type = 'material',
  /**
   * size of icon (optional)
   */
  size = iconSizes.small,
  /**
   * Name of the icon to be shown
   *
   * Search here: https://oblador.github.io/react-native-vector-icons/
   */
  name = '',
  /**
   * color of icon (optional)
   *
   * If provided, it will be used for icon and Image tint color, if not, then default theme.iconColor for only icon
   */
  color = null,
  /**
   * additional styling to icon (optional)
   */
  iconStyle = {},
  /**
   * Callback to call when Icon is clicked
   */
  onPress = null,
  /**
   * If true, the onPress callback won't be called
   */
  disabled = false,
  /**
   * source Image url source={localImage}, source={{uri:'url'}}
   */
  source = null,
  /**
   * local svg file, size for svg is not handled here we area assuming designer will provide correct svg in size
   */
  Svg = null,
  /**
   * source image style
   */

  svgColor = null,

  imageStyle = {},
  /**
   * tint color added to image
   */
  imageTintColor = null,
  /**
   *  rounded in case of image
   */
  rounded = false,
  /**
   *  If true, show spinner in place of  icon
   */
  loading = false,
  /**
   * used to set the opacity of touchable component
   */
  opacity = 0.5,
  containerStyle = {},
  ...rest
}) => {
  const Component = onPress !== null ? TouchReceptor : View;
  const IconComponent = getIconType(type);

  return (
    <Component
      {...(onPress && {
        onPress,
        disabled,
        activeOpacity: opacity,
        ...rest,
      })}
      style={containerStyle}>
      {loading ? (
        <View
          style={{
            height: size,
            width: size,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomIndicator size="small" />
        </View>
      ) : source ? (
        <Image
          source={source}
          style={[
            styles.imageStyle,
            imageStyle,
            {tintColor: imageTintColor, height: size, width: size},
            rounded && {borderRadius: size / 2},
          ]}
        />
      ) : Svg ? (
        <Svg width={size} height={size} {...(svgColor && {fill: svgColor})} />
      ) : (
        <IconComponent
          testID="icon"
          size={size}
          name={name}
          color={color || colors.inActiveBottomTabColor}
          style={StyleSheet.flatten([styles.iconStyle, iconStyle])}
        />
      )}
    </Component>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    backgroundColor: 'transparent',
  },
  imageStyle: {
    resizeMode: 'contain',
  },
});

export default Icon;
