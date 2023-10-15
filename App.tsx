import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OutingTimeSettingScreen from './screens/intro/OutingTimeSettingScreen';
import TodoMainScreen from './screens/main/MainScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {createRealmContext} from '@realm/react';
import {PaperProvider} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import StartScreen from './screens/intro/IntroStartScreen';
import SafetyBeforeOutingScreen from './screens/intro/SafetyBeforeOutingScreen';
import TakingBeforeOutingScreen from './screens/intro/TakingBeforeOutingScreen';
import TodoBeforeOutingScreen from './screens/intro/TodoBeforeOutingScreen';
import AlarmRequestScreen from './screens/intro/AlarmRequestScreen';
import {realmConfig} from './schema';
import './i18n/i18n.config';
import MainScreen from './screens/main/MainScreen';

/** createNativeStackNavigator */
const {Navigator, Screen} = createNativeStackNavigator();

/** createRealmContext */
const {RealmProvider} = createRealmContext(realmConfig);

const App = () => {
  /** useTranslation */
  const {t} = useTranslation();

  const screenList = [
    {name: 'StartScreen', component: StartScreen},
    {name: 'OutingTimeSettingScreen', component: OutingTimeSettingScreen},
    {name: 'SafetyBeforeOutingScreen', component: SafetyBeforeOutingScreen},
    {name: 'TakingBeforeOutingScreen', component: TakingBeforeOutingScreen},
    {name: 'TodoBeforeOutingScreen', component: TodoBeforeOutingScreen},
    {name: 'AlarmRequestScreen', component: AlarmRequestScreen},
    {name: 'MainScreen', component: MainScreen},
  ];

  return (
    <RealmProvider>
      <PaperProvider>
        <RecoilRoot>
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
              <Navigator>
                {screenList.map(({name, component}) => (
                  <Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{headerBackTitle: t('뒤로')}}
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
