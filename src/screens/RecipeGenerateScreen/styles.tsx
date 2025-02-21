import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {marginSizes} from '../../theme/sizes';
import {moderateScale} from 'react-native-size-matters';

// const {height: ScreenHeight} = Dimensions.get('screen');
export const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.defaultBackgroundColor,
  },
  imageBg: {
    width: '100%',
    height: moderateScale(120),
    borderWidth: 1,
    borderColor: colors.blackTextColor,
    borderStyle: 'dashed',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonStyle: {
    marginTop: marginSizes.md,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
