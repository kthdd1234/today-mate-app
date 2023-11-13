/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import {getAmpmHHmm, getUniqueId, setHourMinute} from '../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Item} from '../../schema/ItemSchema';
import {useTranslation} from 'react-i18next';
import {momentBeforeFormatter} from '../../utils/moment';
import DefaultButton from '../button/DefaultButton';
import GridView from '../view/GridView';
import IconButton from '../button/IconButton';
import {Input} from 'react-native-elements';
import {useRecoilState} from 'recoil';
import {isFeedbackAtom} from '../../states';
import {useRealm, useQuery} from '@realm/react';
import {Task} from '../../schema/TaskSchema';
import AddImageButton from '../button/AddImageButton';
import CheckButton from '../button/CheckButton';
import {IParamsChecked} from '../../types/interface';
import TodoButton from '../button/TodoButton';
import MemoButton from '../button/MemoButton';
import {Divider} from '@rneui/themed';
import TagButton from '../button/TagButton';
import CalendarSvg from '../../svgs/calendar.svg';
import TaskListEditSvg from '../../svgs/task-list.svg';
import AddSvg from '../../svgs/add-circle.svg';

interface IProps {
  /** */
  item: Item;
}

const AppointmentItem = ({item}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRealm */
  const realm = useRealm();
  const taskList = useQuery(Task, task =>
    task.filtered('itemId == $0', item._id),
  );

  /** useState */
  const [isShowInput, setIsShowInput] = useState(false);
  const [inputText, setInputText] = useState('');

  /** useRecoilValue */
  const [isFeedback, setIsFeekback] = useRecoilState(isFeedbackAtom);

  /** time 계산 */
  const appointmentTime = item ? item.appointmentTime : '';
  const earlyArrivalTime = item ? item.earlyArrivalTime : '';
  const arrivalTime = getAmpmHHmm(
    momentBeforeFormatter({
      formatString: appointmentTime,
      minute: Number(earlyArrivalTime),
    }),
  );

  /** data */
  const data = [
    {name: '약속 시간', value: getAmpmHHmm(appointmentTime)},
    {
      name: '도착 시간',
      value: arrivalTime,
    },
    {name: '일찍 도착', value: setHourMinute(Number(earlyArrivalTime))},
    {
      name: '실천 횟수',
      value: `${-1}회`,
    },
  ];

  useEffect(() => {
    if (isFeedback) {
      setIsFeekback(false);
      onSubmitEditing();
    }
  }, [isFeedback]);

  useEffect(() => {
    taskList.addListener(() => {
      console.log(taskList);
    });
  }, []);

  const onPressMore = () => {
    //
  };

  const onPressPlus = () => {
    setIsShowInput(true);
  };

  const onPressCalendar = () => {
    //
  };

  const onPressTimeline = () => {
    //
  };

  const onChangeText = (text: string) => {
    setInputText(text);
  };

  const onSubmitEditing = () => {
    if (inputText !== '') {
      realm.write(() => {
        realm.create('Task', {
          _id: getUniqueId(0),
          itemId: item._id,
          name: inputText,
          isChecked: false,
        });
      });

      Keyboard.dismiss();

      setIsShowInput(false);
      setInputText('');
    }
  };

  const todoIconList = [
    {
      id: 'calendar',
      icon: <CalendarSvg width={25} height={25} />,
      onPress: onPressCalendar,
    },
    {
      id: 'add',
      icon: <AddSvg width={25} height={25} />,
      onPress: onPressPlus,
    },
  ];

  const onChecked = ({id, newValue}: IParamsChecked) => {
    //
  };

  const onPressTodo = id => {
    //
  };

  return (
    <View className="p-4 bg-white rounded-lg">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row">
          <Text className="mr-1 text-lg font-bold">{item.destination}</Text>
          <TagButton
            color="green"
            icon="notifications-active"
            name="실천 알림"
          />
          <TagButton color="purple" icon="repeat" name="알림 반복" />
        </View>
        <IconButton
          icon={<MaterialIcons name="more-vert" size={15} />}
          onPress={onPressMore}
        />
      </View>
      <GridView
        col={2}
        data={data}
        renderItem={({name, value}) => (
          <View className="flex-row items-center mb-1">
            <Text className="mr-3 text-sm font-bold text-gray-400 ">
              {name}
            </Text>
            <Text>{value}</Text>
          </View>
        )}
      />
      <Divider />
      <View className="mt-4">
        <View className="flex-row justify-between mb-2">
          <View>
            <Text className="text-xs font-semibold text-red-500 ">오늘</Text>
            <Text className="text-base font-bold text-gray-500">
              {t('일찍 도착 후 할 일')}
            </Text>
          </View>
          <View className="flex-row items-center ">
            {todoIconList.map(({id, icon, onPress}) => (
              <View key={id} className="ml-2">
                <IconButton icon={icon} onPress={onPress} />
              </View>
            ))}
          </View>
        </View>
        <View>
          {taskList.map(({_id, name}) => (
            <View key={_id} className="flex-row">
              <CheckButton id={_id} initState={false} onChecked={onChecked} />
              <TodoButton id={_id} name={name} onPress={onPressTodo} />
            </View>
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
        <View>
          <AddImageButton />
        </View>
        <View>
          <MemoButton />
        </View>
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
{
  /* <DefaultButton
id=""
isEnable={true}
text="지각 했어요"
onPress={onPressTardy}
/> */
}
