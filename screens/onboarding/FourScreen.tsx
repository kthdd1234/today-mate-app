import {useTranslation} from 'react-i18next';
import {SafeAreaView, Text, View} from 'react-native';
import DefaultButton from '../../components/button/DefaultButton';
import Stepper from '../../components/step/stepper';
import RealmPlugin from 'realm-flipper-plugin-device';
import {useQuery, useRealm} from '@realm/react';
import {Task} from '../../schema/TaskSchema';
import {Item} from '../../schema/ItemSchema';
import {useRecoilValue} from 'recoil';
import {v4 as uuid} from 'uuid';
import {
  cancelAllNotification,
  createTriggerNotification,
  requestNotificationPermission,
} from '../../utils/notifee';
import {momentBeforeFormatter, momentFormatter} from '../../utils/moment';
import {RepeatFrequency} from '@notifee/react-native';
import {
  destinationAtom,
  appintmentTimeAtom,
  destinationTimeAtom,
  goalsAtom,
  earlyStartAtom,
  outingReadyAtom,
} from '../../states';
import moment from 'moment';
import {getLng, outingReadyNotificationMessage} from '../../constants';
import NotificationBottomSheet from '../../components/bottomSheet/NotificationBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useRef} from 'react';
import {INotificationRepeatState} from '../../types/interface';
import {eDays, eRepeatType} from '../../types/enum';

const FourScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

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
  const outingReadyTime = useRecoilValue(outingReadyAtom);
  const earlyStartTime = useRecoilValue(earlyStartAtom);
  const goals = useRecoilValue(goalsAtom);

  /** useRef */
  const notificationRef = useRef<BottomSheetModal>(null);

  const setNotifee = async () => {
    const isPermission = await requestNotificationPermission();

    if (isPermission) {
      const {title, subTitle, body} = outingReadyNotificationMessage; // 외출 준비 시작 알림 메세지

      /** time calculate */
      const appointmentTime = getAppointmentTime(); // 약속 시간
      const sumMinutes = Number(destinationTime) + Number(earlyStartTime); // 걸리는 시간 + 일찍 출발

      const outingTime = momentBeforeFormatter({
        formatString: appointmentTime,
        minute: sumMinutes,
      }); // 외출 시간 (약속 시간 - (걸리는 시간 + 일찍 출발))
      const outingReadyStartTime = momentBeforeFormatter({
        formatString: outingTime,
        minute: Number(outingReadyTime),
      }); // 외출 준비 시작 시간 (외출 시간 - 외출 준비 시간)

      await cancelAllNotification();

      return await createTriggerNotification({
        title: t(title),
        subTitle: t(subTitle),
        body: t(body),
        dateTime: outingReadyStartTime,
        repeat: RepeatFrequency.DAILY,
        categoryId: 'outing',
      });
    }

    return null;
  };

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
        destination: t(destination),
        appointmentTime: getAppointmentTime(),
        destinationTime: destinationTime,
        earlyStartTime: earlyStartTime,
        outingReadyTime: outingReadyTime,
        isNotify: !!notificationId,
        notificationId: notificationId || '',
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

  const onSave = async (isAllow: boolean) => {
    let notificationId: string | null = null;

    if (isAllow) {
      notificationId = await setNotifee();
    }

    deleteAllRealmData(); // 임시 코드

    setRealmTask();
    setRealmItem(notificationId);
    setRealmUser();

    navigation.reset({
      routes: [{name: 'MainScreen'}],
    });
  };

  const onCompletedNotificationBottonSheet = ({
    repeatType,
    days,
  }: INotificationRepeatState) => {
    //
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
          onPress={() => onSave(true)}
        />
        <DefaultButton
          isEnable={false}
          id="reject-btn"
          text={t('아니요. 안 받을게요.')}
          onPress={() => onSave(false)}
        />
      </View>
      <NotificationBottomSheet
        targetRef={notificationRef}
        initState={{
          repeatType: eRepeatType.EveryWeek,
          days: Object.values(eDays),
        }}
        onCompleted={onCompletedNotificationBottonSheet}
      />
    </SafeAreaView>
  );
};

export default FourScreen;
