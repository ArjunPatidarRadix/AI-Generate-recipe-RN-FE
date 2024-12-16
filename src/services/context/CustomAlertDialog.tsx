import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {Button} from '../../components/button/Button';
import Text from '../../components/Text/Text';

type DialogButton = {
  text: string;
  onPress?: () => void;
};

type CustomAlertDialogProps = {
  title: string;
  message: string;
  buttons?: DialogButton[];
  onClose: () => void;
};

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  title,
  message,
  buttons,
  onClose,
}) => {
  return (
    <Modal transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text type="semiBold" style={styles.title}>
            {title}
          </Text>
          <Text type="subHeader2" style={styles.message}>
            {message}
          </Text>
          <View style={styles.buttonContainer}>
            {buttons?.map((button, index) => (
              <Button
                type="solid"
                key={index}
                size="sm"
                title={button.text}
                onPress={() => {
                  button.onPress?.();
                  onClose();
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

export default CustomAlertDialog;
