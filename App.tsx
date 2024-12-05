/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {NotifierWrapper} from 'react-native-notifier';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';

import {store} from './src/services/redux';
import {RootStackNavigator} from './src/navigation/navigations';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';

export const getTheme = (isDarkMode: boolean) => ({
  ...DefaultTheme,
  dark: isDarkMode,
  mode: 'adaptive',
  colors: {
    ...DefaultTheme.colors,
  },
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'light';

  let persistor = persistStore(store);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={getTheme(isDarkMode)}>
            <NotifierWrapper>
              <RootStackNavigator />
            </NotifierWrapper>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
