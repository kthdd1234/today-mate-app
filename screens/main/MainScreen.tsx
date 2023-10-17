import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OutingManageScreen from './OutingManageScreen';
import OutingSettingScreen from './OutingSettingScreen';
import {useTranslation} from 'react-i18next';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

/** createBottomTabNavigator */
const {Navigator, Screen} = createBottomTabNavigator();

const MainScreen = () => {
  /** useTranslation */
  const {t} = useTranslation();

  const bottomTabList = [
    {
      icon: 'home',
      name: '홈',
      component: OutingManageScreen,
    },
    {
      icon: 'setting',
      name: '설정',
      component: OutingSettingScreen,
    },
  ];

  return (
    <Navigator initialRouteName="OutingManageScreen">
      {bottomTabList.map(({icon, name, component}) => (
        <Screen
          key={name}
          name={t(name)}
          component={component}
          options={{
            headerShown: false,
            tabBarLabel: t(name),
            // eslint-disable-next-line react/no-unstable-nested-components
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
