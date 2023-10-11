import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OutingTimeSettingScreen from './screens/intro/OutingTimeSettingScreen';
import TodoMainScreen from './screens/main/TodoMainScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import StartScreen from './screens/intro/StartScreen';
import './i18n/i18n.config';
import OutingBeforeSafetyScreen from './screens/intro/OutingBeforeSafetyScreen';
import OutingBeforeTakingScreen from './screens/intro/OutingBeforeTakingScreen';
import OutingBeforeTodoScreen from './screens/intro/OutingBeforeTodoScreen';

/** createNativeStackNavigator */
const {Navigator, Screen} = createNativeStackNavigator();

// const lngs = {
//   en: {nativeName: 'English'},
//   ko: {nativeName: 'Korean'},
// };

const App = () => {
  /** useTranslation */
  const {t} = useTranslation();

  const screenList = [
    {name: 'StartScreen', component: StartScreen},
    {name: 'OutingTimeSettingScreen', component: OutingTimeSettingScreen},
    {name: 'OutingBeforeSafetyScreen', component: OutingBeforeSafetyScreen},
    {name: 'OutingBeforeTakingScreen', component: OutingBeforeTakingScreen},
    {name: 'OutingBeforeTodoScreen', component: OutingBeforeTodoScreen},
    {name: 'TodoMainScreen', component: TodoMainScreen},
  ];

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
};

export default App;
