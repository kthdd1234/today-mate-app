/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import SettingScreen from './SettingScreen';
import HomeScreen from './HomeScreen';

/** createBottomTabNavigator */
const {Navigator, Screen} = createBottomTabNavigator();

const MainScreen = () => {
  /** useTranslation */
  const {t} = useTranslation();

  const bottomTabList = [
    {
      icon: 'appstore-o',
      name: '약속',
      headerShown: false,
      component: HomeScreen,
    },
    {
      icon: 'setting',
      name: '설정',
      headerShown: true,
      component: SettingScreen,
    },
  ];

  return (
    <Navigator initialRouteName="HomeScreen">
      {bottomTabList.map(({icon, name, headerShown, component}) => (
        <Screen
          key={name}
          name={t(name)}
          component={component}
          options={{
            headerShown: headerShown,
            headerShadowVisible: headerShown,
            tabBarLabel: t(name),
            tabBarIcon: ({color, size}) => (
              <AntDesignIcons name={icon} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Navigator>
  );
};

export default MainScreen;
