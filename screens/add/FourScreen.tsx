import {useTranslation} from 'react-i18next';
import {SafeAreaView, Text, View} from 'react-native';
import DefaultButton from '../../components/button/DefaultButton';
import Stepper from '../../components/step/stepper';
import RealmPlugin from 'realm-flipper-plugin-device';
import {useQuery, useRealm} from '@realm/react';
import {Task} from '../../schema/TaskSchema';
import {Item} from '../../schema/ItemSchema';
import {Notification} from '../../schema/NotificationSchema';
import {useRecoilValue} from 'recoil';
import {v4 as uuid} from 'uuid';
import {
  cancelAllNotification,
  createTriggerNotification,
  requestNotificationPermission,
} from '../../utils/notifee';
import {momentBeforeFormatter} from '../../utils/moment';
import {RepeatFrequency} from '@notifee/react-native';
import {
  destinationAtom,
  appintmentTimeAtom,
  destinationTimeAtom,
  goalsAtom,
  earlyStartAtom,
  outingReadyAtom,
} from '../../states';
import {
  getAppointmentTime,
  getLng,
  initDays,
  outingReadyNotificationMessage,
} from '../../constants';
import NotificationBottomSheet from '../../components/bottomSheet/NotificationBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useRef} from 'react';
import {
  INotificationRepeatState,
  IParamsSetRealm,
  INotificationInfo,
} from '../../types/interface';
import {eDayIndex, eRepeatType} from '../../types/enum';
import {openBottomSheetModal} from '../../utils/gorhom';
import moment from 'moment';

const FourScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRealm */
  const realm = useRealm();
  const taskSchema = useQuery(Task);
  const itemSchema = useQuery(Item);
  const notificationSchema = useQuery(Notification);

  /** uuid */
  const userUuid = uuid();
  const itemUuid = uuid();

  /**  useRecoilValue */
  const destination = useRecoilValue(destinationAtom);
  const appintmentTime = useRecoilValue(appintmentTimeAtom);
  const destinationTime = useRecoilValue(destinationTimeAtom);
  const outingReadyTime = useRecoilValue(outingReadyAtom);
  const earlyStartTime = useRecoilValue(earlyStartAtom);
  const goals = useRecoilValue(goalsAtom);

  /** useRef */
  const notificationRef = useRef<BottomSheetModal>(null);

  /** time calculate */
  const time = getAppointmentTime(appintmentTime); // 약속 시간
  const sumMinutes = Number(destinationTime) + Number(earlyStartTime); // 걸리는 시간 + 일찍 출발

  const outingTime = momentBeforeFormatter({
    formatString: time,
    minute: sumMinutes,
  }); // 외출 시간 (약속 시간 - (걸리는 시간 + 일찍 출발))
  const outingReadyStartTime = momentBeforeFormatter({
    formatString: outingTime,
    minute: Number(outingReadyTime),
  }); // 외출 준비 시작 시간 (외출 시간 - 외출 준비 시간)

  const setNotifee = async ({repeatType, days}: INotificationRepeatState) => {
    let notificationInfo: {id: string; date: string}[] = [];
    const isPermission = await requestNotificationPermission();
    const repeatFrequency = {
      [eRepeatType.None]: RepeatFrequency.NONE,
      [eRepeatType.EveryWeek]: RepeatFrequency.WEEKLY,
    }[repeatType]!;

    let dateTime = new Date(outingReadyStartTime);

    // await cancelAllNotification();

    if (isPermission) {
      const {title, subtitle, body} = outingReadyNotificationMessage;

      if (repeatFrequency === RepeatFrequency.NONE) {
        if (new Date(Date.now()).getTime() > dateTime.getTime()) {
          dateTime = moment(dateTime).add(1, 'd').toDate();
          console.log('다음 날에 알림 설정!', dateTime.toLocaleString());
        }

        const notificationId = await createTriggerNotification({
          title,
          subtitle,
          body,
          dateTime: dateTime,
          categoryId: 'outing',
          repeatFrequency: repeatFrequency,
        });

        notificationInfo.push({
          id: notificationId,
          date: moment(dateTime).format(),
        });
      } else {
        const nextWeekDay = moment(outingReadyStartTime).add(1, 'weeks');
        const dateList = days.map(day =>
          moment(nextWeekDay).day(eDayIndex[day]).toDate(),
        );

        const notifiList = dateList.map(async date => {
          const id = await createTriggerNotification({
            title,
            subtitle,
            body,
            dateTime: date,
            categoryId: 'outing',
            repeatFrequency: repeatFrequency,
          });

          return {id: id, date: moment(date).format()};
        });

        notificationInfo = await Promise.all(notifiList);
      }
    }

    return notificationInfo;
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

  const setRealmItem = ({notificationInfo, repeatType}: IParamsSetRealm) => {
    realm.write(() => {
      realm.create('Item', {
        _id: itemUuid,
        destination: t(destination),
        appointmentTime: getAppointmentTime(appintmentTime),
        destinationTime: destinationTime,
        earlyStartTime: earlyStartTime,
        outingReadyTime: outingReadyTime,
        isNotify: notificationInfo.length !== 0,
        repeatType: repeatType,
        notificationIds: notificationSchema,
        taskList: taskSchema,
      });
    });
  };

  const setRealmTask = () => {
    realm.write(() => {
      goals.forEach(task => {
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
    realm.write(() => realm.deleteAll());
  };

  const setRealmNotification = ({notificationInfo}: INotificationInfo) => {
    realm.write(() => {
      notificationInfo.forEach(info => {
        realm.create('Notification', {
          _id: info.id,
          date: info.date,
          itemId: itemUuid,
        });
      });
    });
  };

  const setRealm = async ({notificationInfo, repeatType}: IParamsSetRealm) => {
    // deleteAllRealmData();

    setRealmNotification({notificationInfo});
    setRealmTask();
    setRealmItem({notificationInfo, repeatType});
    setRealmUser();

    navigation.reset({
      routes: [{name: 'MainScreen'}],
    });
  };

  const onCompletedNotificationBottonSheet = async ({
    repeatType,
    days,
  }: INotificationRepeatState) => {
    const notificationInfo = await setNotifee({repeatType, days});
    setRealm({notificationInfo, repeatType});
  };

  const onAllow = async () => {
    openBottomSheetModal(notificationRef);
  };

  const onReject = () => {
    setRealm({notificationInfo: [], repeatType: eRepeatType.None});
  };

  return (
    <SafeAreaView className="h-full">
      <RealmPlugin realms={[realm]} />
      <Stepper step={4} />
      <View>
        <Text>{t('외출 준비 알림을 받으면')}</Text>
        <Text>{t('차근차근 외출 준비를 시작해서')}</Text>
        <Text>{t('외출 시간이 되었을 때 여유롭게 출발 할 수 있어요 :)')}</Text>
      </View>
      <View>{/* <Image /> */}</View>
      <View>
        <DefaultButton
          isEnable={true}
          id="allow-btn"
          text={t('알림을 받을게요!')}
          onPress={onAllow}
        />
        <DefaultButton
          isEnable={false}
          id="reject-btn"
          text={t('아니요. 안 받을게요.')}
          onPress={onReject}
        />
      </View>
      <NotificationBottomSheet
        targetRef={notificationRef}
        initState={{
          notificationTime: moment(outingReadyStartTime).format('a HH:mm'),
          repeatType: eRepeatType.None,
          days: initDays,
        }}
        onCompleted={onCompletedNotificationBottonSheet}
      />
    </SafeAreaView>
  );
};

export default FourScreen;
