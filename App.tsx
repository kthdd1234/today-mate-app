import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {RealmProvider} from '@realm/react';
import {PaperProvider} from 'react-native-paper';
import {realmConfig} from './schema';
import StartScreen from './screens/start/StartScreen';
import FirstScreen from './screens/add/FirstScreen';
import SecondScreen from './etc/SecondScreen';
import ThirdScreen from './screens/add/ThirdScreen';
import FourScreen from './screens/add/FourScreen';
import MainScreen from './screens/main';
import RecoTodoScreen from './screens/additional/RecoTodoScreen';
import './i18n/i18n.config';
import ItemScreen from './screens/main/ItemScreen';
import ProgressBar from './components/step/ProgressBar';

/** createNativeStackNavigator */
const {Navigator, Screen} = createNativeStackNavigator();

const App = () => {
  const screenList = [
    {
      name: 'StartScreen',
      component: StartScreen,
      headerShown: false,
      hedaerTitle: null,
    },
    {
      name: 'FirstScreen',
      component: FirstScreen,
      headerShown: true,
      hedaerTitle: <ProgressBar step={0} />,
    },
    {
      name: 'ThirdScreen',
      component: ThirdScreen,
      headerShown: true,
      hedaerTitle: <ProgressBar step={1} />,
    },
    {
      name: 'FourScreen',
      component: FourScreen,
      headerShown: true,
      hedaerTitle: <ProgressBar step={2} />,
    },
    {
      name: 'MainScreen',
      component: MainScreen,
      headerShown: false,
      hedaerTitle: null,
    },
    {
      name: 'ItemScreen',
      component: ItemScreen,
      headerShown: false,
      hedaerTitle: null,
    },
    {
      name: 'RecoTodoScreen',
      component: RecoTodoScreen,
      headerShown: true,
      hedaerTitle: null,
    },
  ];

  return (
    <RealmProvider {...realmConfig}>
      <PaperProvider>
        <RecoilRoot>
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
              <Navigator initialRouteName="MainScreen">
                {screenList.map(
                  ({name, headerShown, hedaerTitle, component}) => (
                    <Screen
                      key={name}
                      name={name}
                      component={component}
                      options={{
                        headerTitle: () => hedaerTitle,
                        headerShown: headerShown,
                        // headerStyle: {backgroundColor: 'transparent'},
                        headerShadowVisible: false,
                        headerBackTitleVisible: false,
                      }}
                    />
                  ),
                )}
              </Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        </RecoilRoot>
      </PaperProvider>
    </RealmProvider>
  );
};

export default App;
