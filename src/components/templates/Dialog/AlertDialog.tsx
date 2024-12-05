import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {
  BackHandler,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../../../theme/colors';
import {marginSizes, paddingSizes, sizes} from '../../../theme/sizes';
import {english} from '../../../utils/strings';
import {Button} from '../../button/Button';
import Text, {IText} from '../../Text/Text';
import {moderateScale} from 'react-native-size-matters';
import Icon from '../../Icons/Icon';
import {isNonEmptyString} from '../../../utils/shared';

interface IAlertDialog {
  route: {
    params: {
      title: string;
      description: string;
      positiveButtonCallback: () => void;
      negativeButtonCallback: () => void;
      positiveButtonTitle: string;
      negativeButtonTitle: string;
      backgroundColor: string;
      containerStyle: ViewStyle;
      buttonStyle?: ViewStyle;
      titleStyle: IText;
      messageStyle: IText;
      dismissible: boolean;
      hideNegativeButton: boolean;
      showCancelIcon?: boolean;
      dismissableOnButtonClick?: boolean;
      cancelIconCallback?: () => void;
      isBackGroundImage?: boolean;
      testID?: string;
    };
  };
  navigation: any;
}

export const AlertDialog: React.FC<IAlertDialog> = ({
  route: {
    params: {
      /**
       * Title text
       */
      title = '',
      /**
       * Description text
       */
      description = '',
      /**
       * Callback to be called for positive action
       */
      positiveButtonCallback = () => {},
      /**
       * Callback to be called for negative action
       */
      negativeButtonCallback = () => {},
      /**
       * Text to be shown on positive button
       */
      positiveButtonTitle = english.common.alertWindowPositiveButtonText,
      /**
       * Text to be shown on negative button
       */
      negativeButtonTitle = english.common.alertWindowNegativeButtonText,
      /**
       * Background color behind the dialog
       */
      backgroundColor = null,
      /**
       * Container style that is behind the alert dialog
       */
      containerStyle = {},
      /**
       * Custom style passed to button
       */
      buttonStyle = {},
      /**
       * Title text style
       */
      titleStyle = {},
      /**
       * Message text style
       */
      messageStyle = {},
      /**
       * Set this true, if you want dialog to get dismiss on clicking outside
       * or on back button press on Android
       */
      dismissible = false,
      /**
       * Don't show negative button,
       * only positive button will be displayed
       */
      hideNegativeButton = false,
      /**
       * prop to display cross icon to close window
       */
      showCancelIcon = false,
      /**
       * callback for cancel icon
       */
      dismissableOnButtonClick = true,
      /**
       * fal if you don't want to dismiss the dialog on possitive and negative callback
       */

      cancelIconCallback = () => {},
      isBackGroundImage = false,
      testID,
    },
  },
  /**
   * @source react-navigation
   */
  navigation,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      // Disable hardware back button, if dismissible value is false
      const onBackPress = () => !dismissible;

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [dismissible]),
  );

  const ViewGroup = dismissible ? TouchableWithoutFeedback : React.Fragment;

  return (
    <ViewGroup
      {...(dismissible && {
        onPress: () => navigation.goBack(),
      })}>
      <View
        style={{
          ...styles.backdrop,
          ...(backgroundColor && {backgroundColor}),
        }}
        testID={testID}>
        {showCancelIcon ? (
          <Icon
            name="close"
            type="antdesign"
            iconStyle={styles.icon}
            color={colors.whiteTextColor}
            onPress={() => {
              dismissableOnButtonClick && navigation.pop();
              cancelIconCallback();
            }}
            containerStyle={styles.iconContainer}
          />
        ) : null}
        <View style={[styles.container, containerStyle]}>
          {isNonEmptyString(title) && (
            <Text style={[styles.titleStyle, titleStyle]} type="newH4">
              {title}
            </Text>
          )}
          <Text
            type={isNonEmptyString(title) ? 'large' : 'xLarge'}
            style={[styles.messageStyle, messageStyle]}>
            {description}
          </Text>
          <View style={styles.buttonRootStyle}>
            <Button
              size="sm"
              style={{...styles.buttonStyle, ...buttonStyle}}
              title={positiveButtonTitle}
              onPress={() => {
                dismissableOnButtonClick && navigation.goBack();
                positiveButtonCallback();
              }}
            />
            {!hideNegativeButton && (
              <>
                <Button
                  style={{...styles.cancelButtonStyle, ...buttonStyle}}
                  size="sm"
                  type="outline"
                  title={negativeButtonTitle}
                  onPress={() => {
                    dismissableOnButtonClick && navigation.goBack();
                    negativeButtonCallback();
                  }}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </ViewGroup>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blackTransparent,
    paddingHorizontal: marginSizes.lg * 2,
  },
  container: {
    padding: paddingSizes.md,
    marginHorizontal: marginSizes.xs,
    borderRadius: sizes.sm,
    backgroundColor: colors.whiteTextColor,
  },
  icon: {
    alignSelf: 'flex-end',
  },
  iconContainer: {
    alignSelf: 'flex-end',
    paddingBottom: paddingSizes.xs,
  },
  buttonRootStyle: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginTop: marginSizes.sm,
  },
  buttonStyle: {
    backgroundColor: colors.secondaryAppColor,
    borderRadius: moderateScale(50),
  },
  cancelButtonStyle: {
    borderRadius: moderateScale(50),
  },
  titleStyle: {
    paddingBottom: sizes.md,
    textAlign: 'center',
  },
  messageStyle: {
    paddingBottom: sizes.md,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
