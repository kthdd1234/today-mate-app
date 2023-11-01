import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppointmentTimeScreen from './screens/intro/AppointmentTimeScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {RealmProvider} from '@realm/react';
import {PaperProvider} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import StartScreen from './screens/start/StartScreen';
import {realmConfig} from './schema';
import MainScreen from './screens/main/MainScreen';
import OutingReadyScreen from './screens/intro/OutingReadyScreen';
import DestinationScreen from './screens/intro/DestinationScreen';
import DestinationTimeScreen from './screens/intro/DestinationTimeScreen';
import TodoScreen from './screens/intro/TodoScreen';
import './i18n/i18n.config';

/** createNativeStackNavigator */
const {Navigator, Screen} = createNativeStackNavigator();

const App = () => {
  /** useTranslation */
  const {t} = useTranslation();

  const screenList = [
    {name: 'StartScreen', component: StartScreen},
    {name: 'AppointmentTimeScreen', component: AppointmentTimeScreen},
    {name: 'DestinationScreen', component: DestinationScreen},
    {name: 'DestinationTimeScreen', component: DestinationTimeScreen},
    {name: 'TodoScreen', component: TodoScreen},
    {name: 'OutingReadyScreen', component: OutingReadyScreen},
    {name: 'MainScreen', component: MainScreen},
  ];

  return (
    <RealmProvider {...realmConfig}>
      <PaperProvider>
        <RecoilRoot>
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
              <Navigator initialRouteName="MainScreen">
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
