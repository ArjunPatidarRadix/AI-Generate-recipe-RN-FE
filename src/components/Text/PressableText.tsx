import React, {useState} from 'react';
import {Text as RNText, StyleSheet, TextProps, TextStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {getStyle, TextType} from './Text';

export interface IText extends TextProps {
  type: TextType;
  onPress?: () => void;
  style?: TextStyle;
  pressInStyle?: {};
}

const PressableText: React.FC<IText> = ({
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
   *
   */
  type,
  /**
   * @style prop will overwrite the predefined styling for Text defined by
   * @type prop
   */
  style,
  pressInStyle,
  onPress = null,
  ...props
}) => {
  const [onInPress, setInPress] = useState(false);
  const pressStyle = {color: colors.primaryAppColorFaded};
  return (
    <RNText
      suppressHighlighting={true}
      {...(onPress && {
        onPressIn: () => setInPress(true),
      })}
      {...(onPress && {
        onPressOut: () => setInPress(false),
      })}
      {...(onPress && {onPress})}
      style={
        onInPress
          ? StyleSheet.flatten([
              getStyle(type),
              style,
              pressStyle,
              pressInStyle,
            ])
          : StyleSheet.flatten([getStyle(type), style])
      }
      {...props}
    />
  );
};

export default PressableText;
