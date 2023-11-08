import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {getAmpmHHmm, setHourMinute} from '../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Item} from '../../schema/ItemSchema';
import {useTranslation} from 'react-i18next';
import {momentBeforeFormatter} from '../../utils/moment';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import DefaultButton from '../button/DefaultButton';
import GridView from '../view/GridView';
import IconButton from '../button/IconButton';
import {Input} from 'react-native-elements';

interface IProps {
  /** */
  item: Item;
}

const AppointmentItem = ({item}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useState */
  const [isShowInput, setIsShowInput] = useState(false);
  const [inputText, setInputText] = useState('');

  /** time 계산 */
  const appointmentTime = item ? item.appointmentTime : '';
  const earlyArrivalTime = item ? item.earlyArrivalTime : '';
  const taskList = item
    ? item.taskList.filter(task => task.itemId === item._id)
    : [];
  const arrivalTime = getAmpmHHmm(
    momentBeforeFormatter({
      formatString: appointmentTime,
      minute: Number(earlyArrivalTime),
    }),
  );

  /** */
  const data = [
    {name: '약속 시간', value: getAmpmHHmm(appointmentTime)},
    {
      name: '도착 시간',
      value: arrivalTime,
    },
    {name: '일찍 도착', value: setHourMinute(Number(earlyArrivalTime))},
    {
      name: '실천 횟수',
      value: `${taskList.filter(task => task.isChecked).length}회`,
    },
  ];

  const onPressTardy = () => {
    //
  };

  const onPressPlus = () => {
    setIsShowInput(true);
  };

  const onPressNotify = () => {};
  const onChangeText = () => {};
  const onSubmitEditing = () => {};

  return (
    <View>
      <View className="flex-row justify-between">
        <Text>{item.destination}</Text>
        <IconButton
          icon={<MaterialIcons name="notifications-on" size={15} />}
          onPress={onPressNotify}
        />
      </View>
      <GridView
        col={2}
        data={data}
        renderItem={({name, value}) => (
          <View className="flex-row">
            <Text>{name}</Text>
            <Text>{value}</Text>
          </View>
        )}
      />
      <View>
        <View className="flex-row justify-between">
          <Text>{t('일찍 도착 후 할 일')}</Text>
          <IconButton
            icon={<AntDesignIcons name="plus" size={15} />}
            onPress={onPressPlus}
          />
        </View>
        <View>
          {taskList.map((task, key) => (
            <TouchableOpacity key={key} className="flex-row">
              <Text>{task.name}</Text>
            </TouchableOpacity>
          ))}
          {isShowInput && (
            <Input
              blurOnSubmit={false}
              enterKeyHint="done"
              autoFocus={true}
              placeholder={t('할 일 추가')}
              value={inputText}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
            />
          )}
        </View>
        <DefaultButton
          id=""
          isEnable={true}
          text="지각 했어요"
          onPress={onPressTardy}
        />
      </View>
    </View>
  );
};

export default AppointmentItem;
{
  /* <AntDesignIcons name="checkcircleo" /> 
  const notifiDays = notifications.map(info => getDay(info.date)).join(', ');
  */
}
