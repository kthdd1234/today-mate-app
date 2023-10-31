/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import SettingScreen from './SettingScreen';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import ItemScreen from './ItemScreen';
import IconButtonHeader from '../../components/header/IconButtonHeader';
import {Text, View} from 'react-native';

/** createBottomTabNavigator */
const {Navigator, Screen} = createBottomTabNavigator();

const MainScreen = () => {
  /** useTranslation */
  const {t} = useTranslation();

  const bottomTabItemList = [
    {name: t('약속 시간'), value: ''},
    {name: t('걸리는 시간'), value: ''},
    {name: t('일찍 도착'), value: ''},
    {name: t('외출 준비'), value: ''},
  ];

  // const bottomTabList = [
  //   {
  //     icon: 'home',
  //     name: '외출',
  //     component: OutingManageScreen,
  //   },
  //   {
  //     icon: 'setting',
  //     name: '설정',
  //     component: SettingScreen,
  //   },
  // ];

  return (
    <Navigator initialRouteName="ItemScreen">
      {bottomTabItemList.map(({name, value}) => (
        <Screen
          key={name}
          name={t(name)}
          component={ItemScreen}
          options={{
            headerTitle: '목적지',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            tabBarLabel: props => (
              <View {...props}>
                <Text></Text>
                <Text></Text>
              </View>
            ),
            headerRight: () => <IconButtonHeader />,
          }}
        />
      ))}
    </Navigator>
  );
};

export default MainScreen;
