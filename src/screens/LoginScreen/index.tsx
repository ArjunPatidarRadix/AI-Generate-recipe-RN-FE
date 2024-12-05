import {View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../SignupScreen/styles';
import {Button} from '../../components/button/Button';
import {marginSizes} from '../../theme/sizes';
import Text from '../../components/Text/Text';
import PressableText from '../../components/Text/PressableText';
import {colors} from '../../theme/colors';
import {TUserLogin} from '../../types/TUser';
import {ApiCall} from '../../services/api/call';
import {AppApiException} from '../../services/api/error/AppApiException';
import {
  NAVIGATION_TO_ALERT_DIALOG,
  NAVIGATION_TO_LOADER_VIEW,
} from '../../utils/constant/ScreenConstants';
import {english} from '../../utils/strings';
import Request from '../../services/api/apiRequester';
import {getToken} from '../../utils/shared';

const LoginScreen = ({navigation}: any) => {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TUserLogin>({
    email: '',
    password: '',
  });

  useEffect(() => {
    async function name() {
      try {
        const token = await getToken();
        if (token) {
          navigation.navigate('Dashboard');
        }
      } catch (error) {
        console.log('error:: ', error);
      }
    }
    name();
  }, []);

  const handleInputChange = (value: string, name: string) => {
    setFormData({...formData, [name]: value});
  };

  async function callLoginApi(formData: TUserLogin) {
    setLoading(true);
    const result = await ApiCall.callLogin(formData);
    setLoading(false);

    if (!(result instanceof AppApiException)) {
      navigation.navigate('Dashboard');
    } else {
      const res = result as AppApiException;
      console.log('res :', res.message);
    }
  }

  const handleSubmit = () => {
    if (formData?.email && formData?.password) {
      // Handle login logic
      console.log('Login:', formData);
      callLoginApi(formData);
    } else {
      // navigation.navigate(NAVIGATION_TO_LOADER_VIEW);
      navigation.navigate(NAVIGATION_TO_ALERT_DIALOG, {
        title: 'Error',
        description: 'Please enter email and password',
        hideNegativeButton: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text type="newH4" style={styles.title}>
        Login
      </Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        textContentType="emailAddress"
        onChangeText={value => handleInputChange(value, 'email')}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={value => handleInputChange(value, 'password')}
      />
      <Button
        title="Login"
        size="sm"
        style={{width: '100%'}}
        onPress={handleSubmit}
        loading={isLoading}
      />

      <View style={{flexDirection: 'row', gap: '5', marginTop: marginSizes.md}}>
        <PressableText type="semiBold">Don't have an account? </PressableText>
        <PressableText
          type="semiBold"
          style={{color: colors.primaryAppColor}}
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </PressableText>
      </View>
    </View>
  );
};

export default LoginScreen;
