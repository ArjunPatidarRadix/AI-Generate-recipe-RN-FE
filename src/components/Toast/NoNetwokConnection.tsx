import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {marginSizes, paddingSizes, sizes} from '../../theme/sizes';
import {english} from '../../utils/strings';
import Icon from '../Icons/Icon';
import Text from '../Text/Text';
import {fontFamilyRegular} from '../Text/typography';
import {moderateScale} from 'react-native-size-matters';
import {svgs} from '../../assets/svgs';

interface INoConnected {}

export const NoNetwokConnection: React.FC<
  INoConnected
> = ({}: INoConnected) => {
  return (
    <View style={styles.toastView}>
      <View style={styles.container}>
        <Icon
          Svg={svgs.errorSvg}
          size={moderateScale(24)}
          svgColor={colors.whiteTextColor}
          containerStyle={styles.alertIcon}
        />
        <Text type={'large'} style={styles.msgText}>
          {english.common.noInternetTitle}
        </Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgText: {
    color: colors.whiteTextColor,
    fontFamily: fontFamilyRegular,
  },
  alertIcon: {
    marginRight: marginSizes.xs,
  },
  toastView: {
    width: '95%',
    marginHorizontal: marginSizes.sm,
    marginBottom: sizes.toastView,
    backgroundColor: colors.borderOutlineActiveColor,
    padding: paddingSizes.smm,
    borderRadius: 8,
    justifyContent: 'center',
  },
});
