import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {useObject, useQuery} from '@realm/react';
import {User} from '../../schema/UserSchema';
import {Item} from '../../schema/ItemSchema';

const ItemScreen = () => {
  /** realm */
  const users = useQuery(User);
  const itemObj = useObject(Item, users[0].defaultItemId);

  const destination = itemObj ? itemObj.destination : '';

  const appointmentTime = itemObj ? itemObj.appointmentTime : '';
  const destinationTime = itemObj ? itemObj.destinationTime : '';
  const earlyStartTime = itemObj ? itemObj.earlyStartTime : '';
  const outingReadyTime = itemObj ? itemObj.outingReadyTime : '';

  const timeInfo = [
    {
      name: '약속 시간',
      value: getTimeFormatStr(appointmentTime),
    },
    {name: '걸리는 시간', value: setHourMinuteStr(Number(destinationTime))},
    {name: '일찍 출발', value: '20분'},
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
    </SafeAreaView>
  );
};

export default ItemScreen;

// 할
