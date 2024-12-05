import {Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';

export const fontFamilyRegular = Platform.select({
  android: 'Poppins-Regular',
  ios: 'Poppins-Regular',
});

export const fontFamilyBold = Platform.select({
  android: 'Poppins-Bold',
  ios: 'Poppins-Bold',
});

export const fontFamilySemiBold = Platform.select({
  android: 'Poppins-SemiBold',
  ios: 'Poppins-SemiBold',
});

export const fontFamilyExtraBold = Platform.select({
  android: 'Poppins-ExtraBold',
  ios: 'Poppins-ExtraBold',
});

export const fontFamilyMedium = Platform.select({
  android: 'Poppins-Medium',
  ios: 'Poppins-Medium',
});

export default {
  /**
   * Heading Text - h1
   */
  h1: {
    // fontFamily: fontFamilyBold,
    color: colors.blackTextColor,
    fontSize: moderateScale(36),
    lineHeight: moderateScale(37.8),
  },
  /**
   * Heading Text - h2
   */
  h2: {
    fontFamily: fontFamilyRegular,
    color: colors.blackTextColor,
    fontSize: moderateScale(24),
    lineHeight: moderateScale(30.6),
  },
  /**
   * Heading Text - subHeading
   */
  subHeader: {
    fontFamily: fontFamilyRegular,
    color: colors.blackTextColor,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
  },
  /**
   * Heading Text - subHeader2
   */
  subHeader2: {
    fontFamily: fontFamilyRegular,
    color: colors.blackTextColor,
    fontSize: moderateScale(18),
    lineHeight: moderateScale(26.1),
  },
  /**
   * body text
   */
  body: {
    fontFamily: fontFamilyRegular,
    color: colors.blackTextColor,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20.3),
  },
  /**
   * body text
   */
  body2: {
    fontFamily: fontFamilyRegular,
    color: colors.blackTextColor,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20.3),
  },
  /**
   * cta text
   */
  cta: {
    fontFamily: fontFamilyRegular,
    color: colors.blackTextColor,
    fontSize: moderateScale(14),
    paddingBottom: moderateScale(2), // gallix font have some paading from top so added from bottom to make it centered
    lineHeight: moderateScale(17.5),
  },
  /**
   * The Paragraph text style is used where ever test is appeared as a paragraph in multiple line this is same as body text with extra feature line-height
   */
  cap: {
    fontFamily: fontFamilyRegular,
    color: colors.blackTextColor,
    fontSize: moderateScale(12),
    paddingBottom: moderateScale(2), // gallix font have some paading from top so added from bottom to make it centered
    lineHeight: moderateScale(15),
  },
  poppinsRegular: {
    fontFamily: fontFamilyRegular,
    lineHeight: null,
  },
  newH2: {
    fontFamily: fontFamilyBold,
    fontSize: moderateScale(33),
    lineHeight: moderateScale(39.6),
    letterSpacing: moderateScale(-1),
    color: colors.blackTextColor,
  },
  newH3: {
    fontFamily: fontFamilyBold,
    fontSize: moderateScale(28),
    lineHeight: moderateScale(33.6),
    letterSpacing: moderateScale(-0.5),
    color: colors.blackTextColor,
  },
  newH4: {
    fontFamily: fontFamilyBold,
    fontSize: moderateScale(24),
    lineHeight: moderateScale(28.8),
    letterSpacing: moderateScale(-0.5),
    color: colors.blackTextColor,
  },
  newH5: {
    fontFamily: fontFamilyBold,
    fontSize: moderateScale(19),
    lineHeight: moderateScale(22.8),
    letterSpacing: moderateScale(-0.5),
    color: colors.blackTextColor,
  },
  newH6: {
    fontFamily: fontFamilyBold,
    fontSize: moderateScale(17),
    lineHeight: moderateScale(22.5),
    letterSpacing: moderateScale(-0.5),
    color: colors.blackTextColor,
  },
  xLarge: {
    fontFamily: fontFamilyBold,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    letterSpacing: moderateScale(-0.5),
    color: colors.blackTextColor,
  },
  large: {
    fontFamily: fontFamilyMedium,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(21),
    letterSpacing: moderateScale(-0.5),
    color: colors.blackTextColor,
  },
  largeBold: {
    fontFamily: fontFamilyBold,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(21),
    letterSpacing: moderateScale(-0.5),
    color: colors.blackTextColor,
  },
  mediumBold: {
    fontFamily: fontFamilyBold,
    fontSize: moderateScale(13),
    lineHeight: moderateScale(19.5),
    letterSpacing: moderateScale(-0.5),
    color: colors.blackTextColor,
  },
  semiBold: {
    fontFamily: fontFamilySemiBold,
    fontSize: moderateScale(13),
    lineHeight: moderateScale(19.5),
    letterSpacing: moderateScale(-0.5),
    color: colors.blackTextColor,
  },
  medium: {
    fontFamily: fontFamilyMedium,
    fontSize: moderateScale(13),
    lineHeight: moderateScale(19.5),
    letterSpacing: moderateScale(-0.5),
    color: colors.blackTextColor,
  },
  small: {
    fontFamily: fontFamilyMedium,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
    letterSpacing: moderateScale(-0.25),
    color: colors.blackTextColor,
  },
  xSmall: {
    fontFamily: fontFamilyBold,
    fontSize: moderateScale(11),
    lineHeight: moderateScale(16.5),
    color: colors.blackTextColor,
  },
  textInput: {
    fontSize: moderateScale(13),
    fontFamily: fontFamilyRegular,
  },
  cuisineTextInput: {
    fontSize: moderateScale(13),
    fontFamily: fontFamilyMedium,
    color: colors.blackTextColor,
    lineHeight: moderateScale(15),
  },

  error: {
    fontFamily: fontFamilyMedium,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
    letterSpacing: moderateScale(-0.25),
    color: colors.secondaryCriticalRed,
  },
};
