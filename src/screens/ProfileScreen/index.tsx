import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenContainer} from '../../components/templates/ScreenContainer';
import Text from '../../components/Text/Text';
import {Button} from '../../components/button/Button';
import {paddingSizes} from '../../theme/sizes';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
import {clearCachedData} from '../../utils/shared';
import Request from '../../services/api/apiRequester';
import {ApiCall} from '../../services/api/call';
import {AppApiException} from '../../services/api/error/AppApiException';
import {IUserResponse} from '../../services/api/entities/IAuthentication';

const ProfileScreen = ({navigation}: any) => {
  const onLoagoutPress = () => {
    clearCachedData();
    navigation.navigate('Login');
  };

  const [userData, setUserData] = useState<IUserResponse | undefined>(
    undefined,
  );

  useEffect(() => {
    async function getProfile() {
      Request.Instance.setLoader(true);
      const result = await ApiCall.callGetProfile();
      Request.Instance.setLoader(false);
      if (!(result instanceof AppApiException)) {
        setUserData(result);
      }
    }
    getProfile();
  }, []);

  return (
    <View
      style={{
        justifyContent: 'space-between',
        flex: 1,
        padding: paddingSizes.md,
      }}>
      <Text
        containerStyle={{
          paddingVertical: paddingSizes.md,
          borderBottomWidth: 1,
          borderBottomColor: colors.grayColor,
        }}
        type="newH5">
        Profile
      </Text>
      {userData ? (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
          <View
            style={{
              width: moderateScale(80),
              height: moderateScale(80),
              borderRadius: 100,
              borderColor: colors.primaryAppColor,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              backgroundColor: colors.primaryAppColorFaded,
            }}>
            <Text type="newH4">{userData.name.charAt(0)}</Text>
          </View>
          <View>
            <Text type="large">Welcome, {userData.name}</Text>
            <Text type="large">{userData.email}</Text>
          </View>
        </View>
      ) : (
        <></>
      )}
      <Button title="Logout" size="sm" onPress={onLoagoutPress} />
    </View>
  );
};

export default ProfileScreen;
