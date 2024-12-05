import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecipeGenerateScreen from '../screens/RecipeGenerateScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HistoryScreen from '../screens/HistoryScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon, {IconTypes} from '../components/Icons/Icon';
import {iconSizes} from '../theme/sizes';
import {colors} from '../theme/colors';
import {
  APP_NAVIGATION_STACK,
  NAVIGATION_TO_ALERT_DIALOG,
  NAVIGATION_TO_LOADER_VIEW,
  PROFILE_SCREEN,
  RECIPE_HISTORY_SCREEN,
  RECIPE_SCREEN,
} from '../utils/constant/ScreenConstants';
import {AlertDialog} from '../components/templates/Dialog/AlertDialog';
import {Loader} from '../components/templates/LoaderView/Loader';
import {useNetInfo} from '@react-native-community/netinfo';
import Request from '../services/api/apiRequester';
import {useDispatch} from 'react-redux';
import {Keyboard} from 'react-native';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';

export type AppStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  RecipeDetails: undefined;
};

export type RootStackParamList = {
  AppNavigationStack: undefined;
  AlertDialog: undefined;
  LoaderView: undefined;
};

export type DashboardTabsParamList = {
  RecipeGenerate: undefined;
  History: undefined;
  Profile: undefined;
};

// Create Navigators
const AppStack = createStackNavigator<AppStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<DashboardTabsParamList>();

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        lazy: true,
        headerShown: false,
        gestureEnabled: true,
        tabBarIcon: ({focused}) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks

          // eslint-disable-next-line react-hooks/rules-of-hooks

          let type: IconTypes;
          let name: string;
          switch (route.name) {
            case RECIPE_SCREEN:
              type = 'ionicon';
              name = 'restaurant-outline';
              break;
            case RECIPE_HISTORY_SCREEN:
              type = 'material-community';
              name = 'history';

              break;
            case PROFILE_SCREEN:
              type = 'material-community';
              name = 'account-outline';
              break;
            default:
              type = 'material-community';
              name = 'account-outline';
              break;
          }

          return (
            <Icon
              type={type}
              name={name}
              size={iconSizes.bottomBarIcon}
              color={focused ? colors.primaryAppColor : colors.blackTextColor}
            />
          );
        },
      })}>
      <Tab.Screen
        name="RecipeGenerate"
        options={{title: 'Recipe Generate'}}
        component={RecipeGenerateScreen}
      />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Main App Navigation
export const AppStackNavigator = ({navigation}: any) => {
  useEffect(() => {
    Request.Instance.setNavigation(navigation);
  }, [navigation]);

  const dispatch = useDispatch();

  useEffect(() => {
    Request.Instance.setDispatch(dispatch);
  }, [dispatch]);

  return (
    <AppStack.Navigator initialRouteName="Login">
      <AppStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={{headerTitle: 'Recipe Details'}}
      />
    </AppStack.Navigator>
  );
};

export const RootStackNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
            cardStyle: {backgroundColor: colors.transparent},
            gestureEnabled: true,
          }}
          initialRouteName={APP_NAVIGATION_STACK}>
          <RootStack.Screen
            name={APP_NAVIGATION_STACK}
            component={AppStackNavigator}
          />
          <RootStack.Screen
            name={NAVIGATION_TO_ALERT_DIALOG}
            component={AlertDialog}
            options={{
              animation: 'fade',
              presentation: 'transparentModal',
            }}
          />
          <RootStack.Screen
            name={NAVIGATION_TO_LOADER_VIEW}
            component={Loader}
            options={{
              animation: 'none',
              presentation: 'transparentModal',
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
