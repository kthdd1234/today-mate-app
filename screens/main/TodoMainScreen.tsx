import TodoSpaceScreen from './TodoSpaceScreen';
import MoreSeeScreen from './MoreSeeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/** createBottomTabNavigator */
const {Navigator, Screen} = createBottomTabNavigator();

const TodoMainScreen = () => {
  const bottomTabList = [
    {name: 'TodoSpaceScreen', component: TodoSpaceScreen},
    {name: 'MoreSeeScreen', component: MoreSeeScreen},
  ];

  return (
    <Navigator initialRouteName="TodoSpaceScreen">
      {bottomTabList.map(({name, component}) => (
        <Screen key={name} name={name} component={component} />
      ))}
    </Navigator>
  );
};

export default TodoMainScreen;
