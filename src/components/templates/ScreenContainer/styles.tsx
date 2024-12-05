import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {appParams, paddingSizes} from '../../../theme/sizes';

// Styles for Screen container template
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBackgroundColor,
    paddingHorizontal: appParams.padding,
    paddingTop: paddingSizes.xlll,
  },
  keyboardView: {
    flex: 1,
  },
});
