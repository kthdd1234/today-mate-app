import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {useObject, useQuery} from '@realm/react';
import {User} from '../../schema/UserSchema';
import {Item} from '../../schema/ItemSchema';
import {getAmpmHHmm, setHourMinute} from '../../constants';
import {useTranslation} from 'react-i18next';
import {momentBeforeFormatter} from '../../utils/moment';
import Video from 'react-native-video';

const ItemScreen = ({route}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** route.params */
  const {itemId} = route.params;

  /** realm */
  const item = useObject(Item, itemId || '');

  /** item */
  const destination = item ? item.destination : '';
  const appointmentTime = item ? item.appointmentTime : '';
  const earlyArrivalTime = item ? item.earlyArrivalTime : '';
  const taskList = item ? item.taskList : [];

  const timeInfo = [
    {
      name: '약속 시간',
      value: getAmpmHHmm(appointmentTime),
    },
    {name: '일찍 출발', value: setHourMinute(Number(earlyArrivalTime))},
  ];

  return (
    <SafeAreaView>
      {/* <Video
        style={styles.backgroundVideo}
        source={require('../../videos/sun.mp4')}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      /> */}
      <View className="h-full p-4 ">
        <View>
          <Text>{destination}</Text>
          <Text>{t('외출까지 남은 시간')}</Text>
          <Text>01:30:29</Text>
        </View>
        <View>
          <Text>{t('설정 시간')}</Text>
          <View className="flex-row justify-around">
            {timeInfo.map((info, key) => (
              <TouchableOpacity className="items-center" key={key}>
                <Text>{t(info.name)}</Text>
                <Text>{info.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View>
          <Text>{t('일찍 도착 시 할 일')}</Text>
          <View>
            {taskList
              .filter(task => task.itemId === itemId)
              .map((task, key) => (
                <TouchableOpacity key={key} className="flex-row">
                  <Text>{task.name}</Text>
                  <AntDesignIcons name="checkcircleo" />
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default ItemScreen;
{
}
