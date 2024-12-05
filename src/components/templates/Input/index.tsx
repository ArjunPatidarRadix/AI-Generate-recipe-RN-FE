import React, {ReactElement} from 'react';
import {
  View,
  TextInputProps,
  TextInput as RNTextInput,
  TextStyle,
} from 'react-native';
import {colors} from '../../../theme/colors';
import {styles} from './styles';
import {TextInput} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';

// Props for template Input ( Used throughout the app)
// pointers after input update -> pass styles to input icons from outer component itself
interface IInput extends Omit<TextInputProps, 'style'> {
  placeHolderTextColor?: string;
  isMultiLine?: boolean;
  isScrollEnabled?: boolean;
  autoCapitalize?: any;
  secureText?: boolean;
  style?: {};
  //props to add right icon
  rightIcon?: boolean;
  RightIcon?: ReactElement;
  // props to add left icon
  leftIcon?: boolean;
  LeftIcon?: ReactElement;
  containerStyle?: object;
  onBlur?: () => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  contentStyle?: TextStyle;
  surfaceVariantColor?: string;
  placeHolderStyle?: TextStyle;
  activeOutlineColor?: string;
}

// Template Input used in App
export const Input = React.forwardRef<RNTextInput, IInput>(
  (
    {
      placeHolderTextColor,
      isMultiLine = false,
      isScrollEnabled,
      autoCapitalize = 'sentences',
      secureText,
      style = {},
      RightIcon,
      LeftIcon,
      containerStyle,
      onBlur,
      /**
       * Overwrite the color of the Text input used either in background, border
       */
      placeholder = '',
      // don't pass label if you want no label in focus mode
      label = '',
      error = false,
      contentStyle = {},
      surfaceVariantColor,
      placeHolderStyle = {},
      ...rest
    }: IInput,
    ref,
  ) => {
    return (
      // Container view component for input field
      <View style={[{...styles.container, ...(containerStyle || {})}]}>
        <TextInput
          ref={ref}
          mode={'outlined'}
          label={label}
          keyboardType={'email-address'}
          placeholder={placeholder}
          placeholderTextColor={
            placeHolderTextColor || colors.placeholderTextColor
          }
          style={{...styles.input, ...style}}
          secureTextEntry={secureText || false}
          multiline={isMultiLine}
          contentStyle={contentStyle}
          scrollEnabled={isScrollEnabled}
          outlineColor={colors.borderOutlineColor}
          activeOutlineColor={colors.borderOutlineActiveColor}
          textAlignVertical={isMultiLine ? 'top' : 'auto'}
          onBlur={() => {
            onBlur && onBlur();
          }}
          error={error}
          autoCapitalize={autoCapitalize}
          // onScroll={isMultiLine ? undefined : Keyboard.dismiss}
          theme={{
            roundness: moderateScale(10),
            colors: {
              error: colors.secondaryCriticalRed,
              errorContainer: colors.secondaryCriticalRed,
              onSurfaceVariant:
                surfaceVariantColor || colors.borderOutlineActiveColor,
            },
            fonts: {
              bodyLarge: placeHolderStyle,
            },
          }}
          left={LeftIcon}
          right={RightIcon}
          {...rest}
        />
      </View>
    );
  },
);
