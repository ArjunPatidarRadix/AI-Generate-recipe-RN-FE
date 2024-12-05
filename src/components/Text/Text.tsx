import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  TextProps,
  View,
  ViewStyle,
} from 'react-native';
import TouchReceptor from '../TouchReceptor/TouchReceptor';
import TYPOGRAPHY from './typography';

export type TextType =
  | 'h1'
  | 'h2'
  | 'subHeader'
  | 'subHeader2'
  | 'body'
  | 'body2'
  | 'cta'
  | 'cap'
  /**
   * // adding new text style types
   * @todo get rid of old types once they are not required
   */
  | 'newH2'
  | 'newH3'
  | 'newH4'
  | 'newH5'
  | 'newH6'
  | 'xLarge'
  | 'large'
  | 'largeBold'
  | 'mediumBold'
  | 'semiBold'
  | 'medium'
  | 'small'
  | 'xSmall'
  | 'error';

export interface IText extends TextProps {
  type: TextType;
  onPress?: () => void;
  style?: {};
  containerStyle?: ViewStyle;
  allowFontScaling?: boolean;
}

const Text: React.FC<IText> = ({
  /**
   * @type prop helps style Text with pre default styling define in
   * typography.js. Possible value of type can be:
   * 1. 'h1'
   * 2. 'h2'
   * 3. 'subHeader'
   * 4. 'subHeader2'
   * 5. 'body',
   * 6. 'cta'
   * 7. 'cap'
   * 8. 'body2'
   * // new styles added below
   * 9. 'newH2'
   * 10. 'newH4'
   * 11. 'xLarge'
   * 12. 'large'
   * 13. 'mediumBold'
   * 14. 'medium'
   * 15. 'small'
   * 16. 'xSmall'
   * 17. 'newH5'
   * 18. 'largeBold'
   * 19. 'semiBold'
   *
   */
  type,
  /**
   * @style prop will overwrite the predefined styling for Text defined by
   * @type prop
   */
  style,
  onPress = null,
  containerStyle,
  allowFontScaling = true,
  ...props
}) => {
  const Component = onPress ? TouchReceptor : View;
  return (
    <Component {...(onPress && {onPress})} style={containerStyle || {}}>
      <RNText
        allowFontScaling={allowFontScaling}
        style={StyleSheet.flatten([getStyle(type), style])}
        {...props}
      />
    </Component>
  );
};

export const getStyle = (type: string) => {
  switch (type) {
    case 'h1':
      return TYPOGRAPHY.h1;
    case 'h2':
      return TYPOGRAPHY.h2;
    case 'subHeader':
      return TYPOGRAPHY.subHeader;
    case 'subHeader2':
      return TYPOGRAPHY.subHeader2;
    case 'body':
      return TYPOGRAPHY.body;
    case 'body2':
      return TYPOGRAPHY.body2;
    case 'cta':
      return TYPOGRAPHY.cta;
    case 'cap':
      return TYPOGRAPHY.cap;
    /**
     * // adding new text styles below
     * @todo get rid of old styles once they are not required
     */
    case 'newH2':
      return TYPOGRAPHY.newH2;
    case 'newH3':
      return TYPOGRAPHY.newH3;
    case 'newH4':
      return TYPOGRAPHY.newH4;
    case 'newH5':
      return TYPOGRAPHY.newH5;
    case 'newH6':
      return TYPOGRAPHY.newH6;
    case 'xLarge':
      return TYPOGRAPHY.xLarge;
    case 'large':
      return TYPOGRAPHY.large;
    case 'largeBold':
      return TYPOGRAPHY.largeBold;
    case 'mediumBold':
      return TYPOGRAPHY.mediumBold;
    case 'semiBold':
      return TYPOGRAPHY.semiBold;
    case 'medium':
      return TYPOGRAPHY.medium;
    case 'small':
      return TYPOGRAPHY.small;
    case 'xSmall':
      return TYPOGRAPHY.xSmall;
    case 'error':
      return TYPOGRAPHY.error;
    default:
      return TYPOGRAPHY.small;
  }
};

export default Text;
