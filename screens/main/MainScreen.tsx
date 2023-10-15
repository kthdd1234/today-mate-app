import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OutingManageScreen from './OutingManageScreen';
import OutingSettingScreen from './OutingSettingScreen';

/** createBottomTabNavigator */
const {Navigator, Screen} = createBottomTabNavigator();

const MainScreen = () => {
  const bottomTabList = [
    {name: 'OutingManageScreen', component: OutingManageScreen},
    {name: 'OutingSettingScreen', component: OutingSettingScreen},
  ];

  return (
    <Navigator initialRouteName="TodoSpaceScreen">
      {bottomTabList.map(({name, component}) => (
        <Screen key={name} name={name} component={component} />
      ))}
    </Navigator>
  );
};

export default MainScreen;
