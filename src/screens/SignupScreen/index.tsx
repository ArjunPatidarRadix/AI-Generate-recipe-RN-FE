import {View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import PressableText from '../../components/Text/PressableText';
import {marginSizes} from '../../theme/sizes';
import {colors} from '../../theme/colors';
import {Button} from '../../components/button/Button';
import Text from '../../components/Text/Text';
import {AppApiException} from '../../services/api/error/AppApiException';
import {ApiCall} from '../../services/api/call';
import {TUserRegistration} from '../../types/TUser';
import {NAVIGATION_TO_ALERT_DIALOG} from '../../utils/constant/ScreenConstants';
import Request from '../../services/api/apiRequester';

const SignupScreen = ({navigation}: any) => {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TUserRegistration>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (value: string, name: string) => {
    setFormData({...formData, [name]: value});
  };

  async function callSignupApi(formData: TUserRegistration) {
    setLoading(true);

    const result = await ApiCall.callSignup(formData);
    setLoading(false);
    if (!(result instanceof AppApiException)) {
      navigation.navigate('Dashboard');
    } else {
      const res = result as AppApiException;
      console.log('res :', res.message);
    }
  }

  const handleSubmit = () => {
    if (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.name &&
      formData.password === formData.confirmPassword
    ) {
      // Handle sign-up logic
      console.log('Sign Up:', formData);
      callSignupApi(formData);
    } else {
      console.log('console error');
      navigation.navigate(NAVIGATION_TO_ALERT_DIALOG, {
        title: 'Error',
        description: 'Please enter email, name, password and confirm password',
        hideNegativeButton: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text type="newH4" style={styles.title}>
        Sign Up
      </Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={value => handleInputChange(value, 'name')}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={value => handleInputChange(value, 'email')}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={value => handleInputChange(value, 'password')}
      />
      <TextInput
        placeholder="ConfirmPassword"
        style={[styles.input, {marginBottom: marginSizes.xs}]}
        secureTextEntry
        onChangeText={value => handleInputChange(value, 'confirmPassword')}
      />

      {formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword ? (
        <Text type="error">Password and confirm password didn't match</Text>
      ) : undefined}

      <Button
        title="Sign Up"
        size="sm"
        style={{width: '100%', marginTop: marginSizes.md}}
        onPress={handleSubmit}
        loading={isLoading}
      />
      <View style={{flexDirection: 'row', gap: '5', marginTop: marginSizes.md}}>
        <PressableText type="semiBold">Already have an account? </PressableText>
        <PressableText
          type="semiBold"
          style={{color: colors.primaryAppColor}}
          onPress={() => navigation.navigate('Login')}>
          Login
        </PressableText>
      </View>
    </View>
  );
};

export default SignupScreen;
