import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';
import {useCustomContext} from './CustomContext';
import {colors} from '../../theme/colors';

const Loader: React.FC = () => {
  const {isLoading} = useCustomContext();

  return (
    <Modal transparent={true} visible={isLoading} animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primaryAppColor} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default Loader;
