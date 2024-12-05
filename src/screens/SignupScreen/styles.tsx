import {StyleSheet, Platform} from 'react-native';
import {sizes} from '../../theme/sizes';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    height: sizes.textInputHeight,
  },
  boxShadow: {
    ...Platform.select({
      ios: {
        shadowColor: colors.grayColor,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: 5,
          width: 5,
        },
      },
      android: {
        elevation: 10,
        shadowColor: colors.blackTextColor,
      },
    }),
  },
});
