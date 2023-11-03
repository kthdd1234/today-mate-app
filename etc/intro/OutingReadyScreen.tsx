import {
  earlyArrivalMinite,
  outingReadyItemList,
  outingReadyNotificationMessage,
  getLng,
} from '../../constants';
import {useRecoilValue} from 'recoil';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useRef, useState} from 'react';
import {openBottomSheetModal} from '../../utils/gorhom';
import format from 'string-format';
import {
  appintmentTimeAtom,
  destinationAtom,
  destinationTimeAtom,
  todoAtom,
} from '../../states';
import OnBoarding from '../../components/onboarding/OnBoarding';
import {useTranslation} from 'react-i18next';
import {ITimeParams} from '../../types/interface';
import TimeSettingBottomSheet from '../../components/bottomSheet/TimeSettingBottomSheet';
import {useQuery, useRealm} from '@realm/react';
import {Task} from '../../schema/TaskSchema';
import {Item} from '../../schema/ItemSchema';
import {
  cancelAllNotification,
  createTriggerNotification,
  requestNotificationPermission,
} from '../../utils/notifee';
import {momentBeforeFormatter, momentFormatter} from '../../utils/moment';
import moment from 'moment';
import {RepeatFrequency} from '@notifee/react-native';
import {View} from 'react-native';
import RealmPlugin from 'realm-flipper-plugin-device';
import {v4 as uuid} from 'uuid';

let outingReadyTime: string = '';

const OutingReadyScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** lastIndex */
  const lastIndex = outingReadyItemList.length - 1;

  /** useRealm */
  const realm = useRealm();
  const taskSchema = useQuery(Task);
  const itemSchema = useQuery(Item);

  /** uuid */
  const userUuid = uuid();
  const itemUuid = uuid();

  /**  useRecoilValue */
  const destination = useRecoilValue(destinationAtom);
  const appintmentTime = useRecoilValue(appintmentTimeAtom);
  const destinationTime = useRecoilValue(destinationTimeAtom);
  const todo = useRecoilValue(todoAtom);

  /** useState */
  const [itemList, setItemList] = useState(outingReadyItemList);
  const [selectedId, setSelectedId] = useState<string>('');

  /** useRef */
  const ref = useRef<BottomSheetModal>(null);

  const getAppointmentTime = () => {
    const {ampm, hour, minute} = appintmentTime;
    const now = moment();

    return momentFormatter({
      year: now.format('YYYY'),
      month: now.format('MM'),
      day: now.format('DD'),
      ampm: ampm!,
      hour: hour,
      minute: minute,
    });
  };

  const setNotifee = async () => {
    const isPermission = await requestNotificationPermission();
    let notificationId: string | null = null;

    if (isPermission) {
      const {title, subTitle, body} = outingReadyNotificationMessage; // 외출 준비 시작 알림 메세지

      /** time calculate */
      const appointmentTime = getAppointmentTime(); // 약속 시간
      const sumMinutes = Number(destinationTime) + Number(earlyArrivalMinite); // 걸리는 시간 + 일찍 도착

      const outingTime = momentBeforeFormatter({
        formatString: appointmentTime,
        minute: sumMinutes,
      }); // 외출 시간 (약속 시간 - (걸리는 시간 + 일찍 도착))
      const outingReadyStartTime = momentBeforeFormatter({
        formatString: outingTime,
        minute: Number(outingReadyTime),
      }); // 외출 준비 시작 시간 (외출 시간 - 외출 준비 시간)

      await cancelAllNotification();
      notificationId = await createTriggerNotification({
        title: t(title),
        subTitle: t(subTitle),
        body: t(body),
        dateTime: outingReadyStartTime,
        repeat: RepeatFrequency.DAILY,
        categoryId: 'outing',
      });
    }

    return notificationId;
  };

  const setRealmUser = () => {
    realm.write(() => {
      realm.create('User', {
        _id: userUuid,
        language: getLng(),
        isDarkMode: false,
        itemList: itemSchema,
        defaultItemId: itemUuid,
      });
    });
  };

  const setRealmItem = (notificationId: string | null) => {
    realm.write(() => {
      realm.create('Item', {
        _id: itemUuid,
        destination: t(destination.text),
        appointmentTime: getAppointmentTime(),
        destinationTime: destinationTime,
        earlyStartTime: earlyArrivalMinite.toString(),
        outingReadyTime: outingReadyTime,
        isNotify: !!notificationId,
        notificationId: notificationId || '',
        taskList: taskSchema,
      });
    });
  };

  const setRealmTask = () => {
    realm.write(() => {
      todo.forEach(task => {
        realm.create('Task', {
          _id: uuid(),
          itemId: itemUuid,
          name: t(`${task}`),
          isChecked: false,
        });
      });
    });
  };

  const deleteAllRealmData = () => {
    realm.write(() => {
      realm.deleteAll();
    });
  };

  const onCompleted = async () => {
    const notificationId = await setNotifee();

    deleteAllRealmData(); // 임시 코드

    setRealmTask();
    setRealmItem(notificationId);
    setRealmUser();

    navigation.reset({
      routes: [{name: 'MainScreen'}],
    });
  };

  const onPressListItem = (id: string) => {
    if (id === lastIndex.toString()) {
      openBottomSheetModal(ref);
    } else {
      outingReadyTime = outingReadyItemList[id].minute;
      setSelectedId(id);

      onCompleted();
    }
  };

  const onCompletedBottomSheet = ({hour, minute}: ITimeParams) => {
    const minuteString = `${Number(hour) * 60 + minute}`;

    const formatString =
      hour === '0'
        ? format('{}분', minuteString)
        : format('{}시간 {}분', hour, minuteString);

    outingReadyTime = minuteString;

    setItemList[lastIndex].text = t(formatString);
    setSelectedId(`${lastIndex}`);

    onCompleted();
  };

  return (
    <View>
      <RealmPlugin realms={[realm]} />
      <OnBoarding
        step={4}
        title="외출 준비 시간은 보통 얼머나 걸려요?"
        list={itemList.map(item => item.text)}
        selectedIds={[selectedId]}
        onPressListItem={onPressListItem}
        bottomSheetModal={
          <TimeSettingBottomSheet
            targetRef={ref}
            isAmpm={false}
            onPressCompleted={onCompletedBottomSheet}
          />
        }
      />
    </View>
  );
};

export default OutingReadyScreen;
