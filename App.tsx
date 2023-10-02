import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OutingTimeScreen from './screens/intro/OutingTimeScreen';
import TodoSettingScreen from './screens/intro/TodoSettingScreen';
import TodoMainScreen from './screens/main/TodoMainScreen';
import TodoAddScreen from './screens/main/TodoAddScreen';

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
    <NavigationContainer>
      <Navigator>
        {screenList.map(({name, component}) => (
          <Screen key={name} name={name} component={component} />
        ))}
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
