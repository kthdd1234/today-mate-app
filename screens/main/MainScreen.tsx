import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OutingManageScreen from './OutingManageScreen';
import OutingSettingScreen from './OutingSettingScreen';
import {useTranslation} from 'react-i18next';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons//Feather';

/** createBottomTabNavigator */
const {Navigator, Screen} = createBottomTabNavigator();

const MainScreen = () => {
  /** useTranslation */
  const {t} = useTranslation();

  const bottomTabList = [
    {
      icon: 'home',
      name: '외출',
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
            headerTitle: '2023년 10월 20일',
            headerTitleAlign: 'left',
            headerShadowVisible: false,
            headerRightContainerStyle: {right: 15},
            headerRight: () => <FeatherIcon name="share" size={20} />,
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
