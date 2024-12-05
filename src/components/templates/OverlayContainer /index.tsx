import React, {ReactElement} from 'react';

import {Modal, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../../theme/colors';
import {appParams} from '../../../theme/sizes';

// props for overlay component
interface IOverlay {
  visible: boolean;
  children: ReactElement;
  rootStyle?: object;
  testID?: string;
}

// Template overlay component for app
// covers entire user screen when loaded
// accepts children elements to display within the overlay
export const Overlay: React.FC<IOverlay> = ({
  visible,
  children,
  rootStyle,
  testID,
}: IOverlay) => {
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={visible}
      testID={testID}>
      <SafeAreaView style={{...styles.modalBackground, ...(rootStyle || {})}}>
        {children}
      </SafeAreaView>
    </Modal>
  );
};

// styles for overlay component
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: colors.transparent,
    paddingHorizontal: appParams.overlayPadding,
    justifyContent: 'flex-end',
  },
});
