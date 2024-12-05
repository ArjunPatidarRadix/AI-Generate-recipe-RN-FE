import React, {ReactElement} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
  ViewStyle,
} from 'react-native';
import {
  Edge,
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {colors} from '../../../theme/colors';
import {paddingSizes} from '../../../theme/sizes';
import {styles} from './styles';

// Props for Screen Container (used in all screens)
interface IScreenContainer extends SafeAreaViewProps {
  children: ReactElement | ReactElement<any>[];
  containerStyle?: ViewStyle;
  edges?: Edge[];
  isBehavior?: boolean;
  isSafeAreaInset?: boolean;
  isPosition?: boolean;
}

// Template Container for screens
// determines default screen padding and Status bar
// accepts children elements to display within the screen
export const ScreenContainer: React.FC<IScreenContainer> = ({
  children,
  containerStyle = {},
  edges,
  isBehavior = true,
  isSafeAreaInset = false,
  isPosition = false,
  ...rest
}: IScreenContainer) => {
  const insets = useSafeAreaInsets();

  const ViewComponent = isSafeAreaInset ? View : SafeAreaView;

  return (
    // To display components inside correct view
    <ViewComponent
      style={[
        {
          ...styles.container,
          ...{
            paddingTop: isSafeAreaInset
              ? insets.top + paddingSizes.xlll
              : paddingSizes.xlll,
          },
        },
        containerStyle,
      ]}
      {...(!isSafeAreaInset && {edges})}
      {...rest}>
      {/* to display components correctly when keyboard is opened */}
      <KeyboardAvoidingView
        behavior={
          isBehavior
            ? isPosition
              ? Platform.OS === 'ios'
                ? undefined
                : 'position'
              : Platform.OS === 'ios'
              ? 'padding'
              : 'height'
            : undefined
        }
        style={styles.keyboardView}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={colors.whiteTextColor}
        />
        {children}
      </KeyboardAvoidingView>
    </ViewComponent>
  );
};
