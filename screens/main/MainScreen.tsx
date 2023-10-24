import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OutingManageScreen from './OutingManageScreen';
import OutingSettingScreen from './OutingSettingScreen';
import {useTranslation} from 'react-i18next';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import IconButtonHeader from '../../components/header/IconButtonHeader';

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
            headerTitle: '외출 관리',
            headerTitleAlign: 'left',
            headerShadowVisible: false,
            headerRightContainerStyle: {right: 15},
            tabBarLabel: t(name),
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <IconButtonHeader />,
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
