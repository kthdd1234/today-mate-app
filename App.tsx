import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {RealmProvider} from '@realm/react';
import {PaperProvider} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {realmConfig} from './schema';
import StartScreen from './screens/start/StartScreen';
import FirstScreen from './screens/onboarding/FirstScreen';
import SecondScreen from './screens/onboarding/SecondScreen';
import ThirdScreen from './screens/onboarding/ThirdScreen';
import FourScreen from './screens/onboarding/FourScreen';
import MainScreen from './screens/main/MainScreen';
import './i18n/i18n.config';
import RecoTodoScreen from './screens/additional/RecoTodoScreen';

/** createNativeStackNavigator */
const {Navigator, Screen} = createNativeStackNavigator();

const App = () => {
  /** useTranslation */
  const {t} = useTranslation();

  const screenList = [
    {name: 'StartScreen', component: StartScreen},
    {name: 'FirstScreen', component: FirstScreen},
    {name: 'SecondScreen', component: SecondScreen},
    {name: 'ThirdScreen', component: ThirdScreen},
    {name: 'FourScreen', component: FourScreen},
    {name: 'MainScreen', component: MainScreen},
    {name: 'RecoTodoScreen', component: RecoTodoScreen},
  ];

  return (
    <RealmProvider {...realmConfig}>
      <PaperProvider>
        <RecoilRoot>
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
              <Navigator initialRouteName="StartScreen">
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
