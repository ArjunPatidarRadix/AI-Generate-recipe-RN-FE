import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../theme/colors';
import {CustomIndicator} from '../../CustomIndicator';

interface ILoader {
  navigation: any;
  route: any;
}

export const Loader: React.FC<ILoader> = ({
  /**
   * @source react-navigation
   */
  route,
}) => {
  return (
    <View style={styles.container}>
      <CustomIndicator
        size={'large'}
        color={route?.params?.color || colors.primaryAppColor}
        animating
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blackTransparent,
  },
});
