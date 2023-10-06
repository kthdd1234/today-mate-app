import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OutingTimeScreen from './screens/intro/OutingTimeScreen';
import TodoSettingScreen from './screens/intro/TodoSettingScreen';
import TodoMainScreen from './screens/main/TodoMainScreen';
import TodoAddScreen from './screens/main/TodoAddScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';

/** createNativeStackNavigator */
const {Navigator, Screen} = createNativeStackNavigator();

const App = () => {
  const screenList = [
    {name: 'OutingTimeScreen', component: OutingTimeScreen},
    {name: 'TodoSettingScreen', component: TodoSettingScreen},
    {name: 'TodoMainScreen', component: TodoMainScreen},
    {name: 'TodoAddScreen', component: TodoAddScreen},
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
                    options={{headerBackTitle: '뒤로'}}
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
