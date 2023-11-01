import {SafeAreaView, Text, View} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {useObject, useQuery} from '@realm/react';
import {User} from '../../schema/UserSchema';
import {Item} from '../../schema/ItemSchema';
import moment from 'moment';
import {getTimeFormatStr, setHourMinuteStr} from '../../constants';

const HomeScreen = () => {
  /** realm */
  const users = useQuery(User);
  const itemObj = useObject(Item, users[0].defaultItemId);

  const destination = itemObj ? itemObj.destination : '';

  const appointmentTime = itemObj ? itemObj.appointmentTime : '';
  const destinationTime = itemObj ? itemObj.destinationTime : '';
  const earlyArrivalTime = itemObj ? itemObj.earlyArrivalTime : '';
  const outingReadyTime = itemObj ? itemObj.outingReadyTime : '';

  const timeInfo = [
    {
      name: '약속 시간',
      value: getTimeFormatStr(appointmentTime),
    },
    {name: '걸리는 시간', value: setHourMinuteStr(Number(destinationTime))},
    {name: '일찍 도착', value: '20분'},
    {name: '외출 준비', value: '50분'},
  ];

  const todoInfo = [
    {id: 'u-1', todo: '🪟 창문 제대로 잠겼는지 확인하기'},
    {id: 'u-2', todo: '🔌 전기 코드 뽑기'},
    {id: 'u-3', todo: '🔑 차 키 챙기기'},
  ];

  return (
    <SafeAreaView className="h-full">
      <View>
        <Text>회사</Text>
        <Text>01:30:29</Text>
        <Text>오전 8:30 외출</Text>
      </View>
      <View>
        <View>
          <Text>시간 정보</Text>
        </View>
        <View className="flex-row">
          {timeInfo.map((info, key) => (
            <View key={key}>
              <Text>{info.name}</Text>
              <Text>{info.value}</Text>
            </View>
          ))}
        </View>
      </View>
      <View>
        <Text>외출 전까지 할 일</Text>
        <View>
          {todoInfo.map((item, key) => (
            <TouchableOpacity key={key} className="flex-row">
              <Text>{item.todo}</Text>
              <AntDesignIcons name="checkcircleo" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <FloatingAction
        actions={[]}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
/**
 * 목적지
 * 약속 시간
 * 걸리는 시간
 * 일찍 도착
 * 외출 준비
 */
