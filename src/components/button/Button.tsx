import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {iconSizes, marginSizes, paddingSizes, sizes} from '../../theme/sizes';
import {CustomIndicator} from '../CustomIndicator';
import Icon, {IIcon} from '../Icons/Icon';
import Text, {TextType} from '../Text/Text';
import TouchReceptor from '../TouchReceptor/TouchReceptor';
import {styles} from './styles';

const SOLID = 'solid';
const OUTLINE = 'outline';

export type ButtonType = 'solid' | 'outline' | 'clear';
const SMALL = 'sm'; // standard small size
const MEDIUM = 'md'; // regular size, no special styles

// props for Button
interface IButton {
  title?: string;
  type?: ButtonType;
  size?: 'sm' | 'md';
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  disabledStyle?: ViewStyle;
  titleStyle?: TextStyle;
  icon?: IIcon | null;
  iconRight?: boolean;
  hideDisableStyle?: boolean;
  tintColor?: string;
  textProps?: object;
  disableBlurEffect?: boolean;
  loadingColor?: string;
  detail?: string;
  separatorStyle?: ViewStyle;
  activeOpacity?: number;
  titleType?: TextType;
  testID?: string;
}
// Default reusable app button, button will be in primary color, if you want secondary button than pass TintColor prop
export const Button: React.FC<IButton> = ({
  /**
   * type can be
   * 1. 'solid'
   * 2. 'outline'
   * 3. 'clear'
   *
   * decide the look of the button,
   * default value is `solid`
   */
  type = SOLID,
  /**
   * Decide the size of Button, value can be
   * 1. 'sm'
   * 2. 'md'
   *
   * default value is `md`
   */
  size = MEDIUM,
  /**
   * text to be shown in button
   */
  title,

  detail,
  /**

   * Callback to be called, when button is clicked
   */
  onPress = () => {},
  /**
   * set true to disable onPress and add custom style
   */
  disabled = false,
  /**
   *  If true, show spinner in place of text & icon
   */
  loading = false,
  /**
   * custom style for button
   */
  style = {},
  /**
   * custom style for text
   */
  titleStyle: _titleStyle = {},
  /**
   * custom style for disabled button
   */
  disabledStyle = {},
  /**
   * If you don't want to apply inbuilt
   * disable styling on button & title
   * send true
   */
  hideDisableStyle = false,
  /**
   * Render an Icon along side the Text
   * An object with the following shape: { type?: ?String, color?: ?ColorValue, name: String, size?: ?number  }.
   * if Icon color passed then it will be same in disabled style
   */
  icon = null,
  /**
   * Render icon on right hand side
   * default value is false
   */
  iconRight = false,
  /**
   * Overwrite the primary color of the Button used either in background, border or spinner
   */
  tintColor = '',
  /**
   *  button title text props
   */
  textProps = {},
  /**
   *  pass this prop only if you need custom color on loading apart from WHITE or PRIMARY color
   */
  loadingColor = '',
  /**
   * hide the blurring effect on button press
   */
  disableBlurEffect,
  /**
   * separator | Style on select or unselect
   */
  separatorStyle = {},
  activeOpacity = 0.2,
  titleType = 'xLarge',
  testID = '',
}: IButton) => {
  const containerStyle = StyleSheet.flatten([
    {
      flexDirection: 'row',
      paddingHorizontal:
        (size === SMALL ? paddingSizes.md - 1 : paddingSizes.lg) -
        (type === OUTLINE ? 1 : 0),
      paddingVertical:
        (size === SMALL ? paddingSizes.sm + paddingSizes.xs : paddingSizes.sm) -
        (type === OUTLINE ? 1 : 0),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:
        type === SOLID
          ? tintColor || colors.secondaryAppColor
          : colors.transparent,
      borderWidth: type === OUTLINE ? 1 : 0,
      borderColor: tintColor || colors.primaryAppColor,
      borderRadius: size === SMALL ? sizes.sm : sizes.defaultButtonRadius,
    },
    style,
    disabled &&
      !hideDisableStyle && {
        backgroundColor:
          type === SOLID ? colors.disabledColor : colors.transparent,
        borderColor: colors.disabledDarkColor, //change border color for disabled if required
      },
    disabled && disabledStyle,
  ]);

  const titleStyle = StyleSheet.flatten([
    {
      color:
        type === SOLID
          ? colors.whiteTextColor
          : tintColor || colors.primaryAppColor,
    },
    _titleStyle,
    disabled && !hideDisableStyle && styles.disabledTitle,
  ]);

  let iconColor;
  if (icon && icon.color) {
    iconColor = icon.color;
  } else if (type === SOLID) {
    iconColor = colors.whiteTextColor;
  } else {
    iconColor = tintColor || colors.primaryAppColor;
  }

  let iconSize;
  if (icon && icon.size) {
    iconSize = icon.size;
  } else if (size === SMALL) {
    iconSize = iconSizes.buttonIcon / 2;
  }

  if (disabled) {
    iconColor = icon?.color || colors.disabledDarkColor;
  }

  const IconComponent = !loading &&
    icon &&
    (icon.name || icon.source || icon.Svg) && (
      <Icon
        {...icon}
        size={iconSize || iconSizes.buttonIcon}
        color={iconColor}
        iconStyle={
          title !== ''
            ? {
                ...{
                  marginStart: iconRight ? marginSizes.xs : 0,
                  marginEnd: iconRight ? 0 : marginSizes.xs,
                },
              }
            : {}
        }
      />
    );

  const accessibilityState = {
    disabled,
    busy: loading,
  };

  return (
    //clickable Button
    <TouchReceptor
      accessible
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      onPress={loading || disabled ? () => {} : onPress}
      disabled={loading || disabled}
      disableBlurEffect={disableBlurEffect}
      activeOpacity={activeOpacity}
      style={containerStyle}
      testID={testID}>
      <>
        {loading && (
          <CustomIndicator
            style={styles.loading}
            color={
              loadingColor ||
              (type === SOLID ? colors.whiteTextColor : colors.primaryAppColor)
            }
            size={'small'}
          />
        )}
        {!iconRight && IconComponent}

        {(!loading || disabled) &&
          title &&
          (detail ? (
            <View style={{flexDirection: 'row'}}>
              <Text type={'xLarge'} style={titleStyle} {...textProps}>
                {title}
              </Text>
              <Text type={'xLarge'} style={separatorStyle} {...textProps}>
                {'  |  '}
              </Text>
              <Text type={'xLarge'} style={titleStyle} {...textProps}>
                {detail}
              </Text>
            </View>
          ) : (
            <Text type={titleType} style={titleStyle} {...textProps}>
              {title}
            </Text>
          ))}

        {iconRight && IconComponent}
      </>
    </TouchReceptor>
  );
};
