import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OutingTimeSettingScreen from './screens/intro/OutingTimeSettingScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {RealmProvider} from '@realm/react';
import {PaperProvider} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import IntroStartScreen from './screens/intro/IntroStartScreen';
import TodoBeforeOutingScreen from './screens/intro/TodoBeforeOutingScreen';
import NotificationRequestScreen from './screens/intro/NotificationRequestScreen';
import {realmConfig} from './schema';
import MainScreen from './screens/main/MainScreen';
import './i18n/i18n.config';
import OutingReadyScreen from './screens/intro/OutingReadyScreen';

/** createNativeStackNavigator */
const {Navigator, Screen} = createNativeStackNavigator();

const App = () => {
  /** useTranslation */
  const {t} = useTranslation();

  const screenList = [
    {name: 'IntroStartScreen', component: IntroStartScreen},
    {name: 'OutingTimeSettingScreen', component: OutingTimeSettingScreen},
    {name: 'TodoBeforeOutingScreen', component: TodoBeforeOutingScreen},
    {name: 'OutingReadyScreen', component: OutingReadyScreen},
    {name: 'NotificationRequestScreen', component: NotificationRequestScreen},
    {name: 'MainScreen', component: MainScreen},
  ];

  return (
    <RealmProvider {...realmConfig}>
      <PaperProvider>
        <RecoilRoot>
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
              <Navigator initialRouteName="IntroStartScreen">
                {screenList.map(({name, component}) => (
                  <Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{headerBackTitle: t('뒤로'), headerShown: false}}
                  />
                ))}
              </Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        </RecoilRoot>
      </PaperProvider>
    </RealmProvider>
  );
};

export default App;
