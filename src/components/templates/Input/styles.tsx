import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../../theme/colors';
import {marginSizes} from '../../../theme/sizes';
import typography from '../../Text/typography';

// styles for template input component
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: marginSizes.md,
  },
  input: {
    ...typography.medium,
    marginVertical: marginSizes.xs - 2,
    paddingBottom: marginSizes.xs - 2,
    paddingHorizontal: 0,
    flex: 1,
    lineHeight: moderateScale(15),
    backgroundColor: colors.whiteTextColor,
  },
  rightIcon: {},
  leftIcon: {
    marginRight: marginSizes.sm,
  },
});
