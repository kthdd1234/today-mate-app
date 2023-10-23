import {Text, View, Image, SafeAreaView} from 'react-native';
import DefaultButton from '../../components/button/defaultButton';
import Stepper from '../../components/step/stepper';
import {useRecoilValue} from 'recoil';
import {
  beforeOutingMinuteAtom,
  outingTimeValuesAtom,
  todoBeforeOutingAtom,
} from '../../states';
import {useQuery, useRealm} from '@realm/react';
import {
  notifiCategories,
  outingTimeNotifiMessage,
  getLng,
} from '../../constants';
import {ISetRealmOuting} from '../../types/interface';
import {useTranslation} from 'react-i18next';
import {Task} from '../../schema/TaskSchema';
import {Outing} from '../../schema/OutingSchema';
import {momentBeforeFormatter, momentFormatter} from '../../utils/moment';
import RealmPlugin from 'realm-flipper-plugin-device';
import {v4 as uuid} from 'uuid';
import moment from 'moment';
import {
  setNotificationCategories,
  createTriggerNotification,
  requestNotificationPermission,
  cancelAllNotification,
} from '../../utils/notifee';
import {RepeatFrequency} from '@notifee/react-native';
import format from 'string-format';

const testImg = require('../../images/test-img.png');

const NotificationRequestScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRealm */
  const realm = useRealm();
  const taskList = useQuery(Task);
  const outingList = useQuery(Outing);

  /** Realm.BSON.ObjectId */
  const userId = uuid();
  const outingId = uuid();

  /** useRecoilValue */
  const {ampm, hour, minute} = useRecoilValue(outingTimeValuesAtom);
  const todoBeforeOuting = useRecoilValue(todoBeforeOutingAtom);
  const beforeOutingMinute = useRecoilValue(beforeOutingMinuteAtom);

  const getOutingTime = () => {
    const now = moment();

    return momentFormatter({
      year: now.format('YYYY'),
      month: now.format('MM'),
      day: now.format('DD'),
      ampm: ampm,
      hour: hour,
      minute: minute,
    });
  };

  const setNotifeeOutingTime = async ({isOK}: {isOK: boolean}) => {
    const notificationInfo: {
      isNotify: boolean;
      outingTimeNotifiId: string | null;
    } = {
      isNotify: false,
      outingTimeNotifiId: null,
    };

    if (isOK) {
      const isPermission = await requestNotificationPermission();
      const {title, body} = outingTimeNotifiMessage;

      if (isPermission) {
        await cancelAllNotification();

        await setNotificationCategories({
          outingTitle: t(notifiCategories.outingCId),
          taskTitle: t(notifiCategories.taskCId),
        });

        const outingTime = getOutingTime();
        const outingTimeNotifiId = await createTriggerNotification({
          title: t(title),
          body: t(body),
          dateTime: outingTime,
          repeat: RepeatFrequency.DAILY,
          categoryId: 'outing',
        });

        notificationInfo.isNotify = true;
        notificationInfo.outingTimeNotifiId = outingTimeNotifiId;
      }
    }

    return notificationInfo;
  };

  const setNotifeeTodo = async ({title, body}) => {
    return await createTriggerNotification({
      title: title,
      body: body,
      dateTime: momentBeforeFormatter({
        formatString: getOutingTime(),
        minute: Number(beforeOutingMinute),
      }),
      repeat: RepeatFrequency.DAILY,
      categoryId: 'task',
    });
  };

  const setRealmTask = ({isNotify}: {isNotify: boolean}) => {
    todoBeforeOuting.forEach(async todo => {
      let taskNotifiId: string | undefined;

      if (isNotify) {
        const title = format(t('외출 {}분 전'), beforeOutingMinute);
        const body = `${todo.emoji} ${t(todo.text)}`;

        taskNotifiId = await setNotifeeTodo({title, body});
      }

      realm.write(() => {
        realm.create('Task', {
          _id: uuid(),
          outingId: outingId,
          taskNotifiId: taskNotifiId,
          emoji: todo.emoji,
          name: t(`${todo.text}`),
          isChecked: false,
        });
      });
    });
  };

  const setRealmOuting = ({isNotify, outingTimeNotifiId}: ISetRealmOuting) => {
    realm.write(() => {
      realm.create('Outing', {
        _id: outingId,
        isNotifyOutingTime: isNotify,
        isNotifyBeforeOutingTime: isNotify,
        outingTime: getOutingTime(),
        beforeOutingMinute: isNotify ? beforeOutingMinute : null,
        outingTimeNotifiId: outingTimeNotifiId,
        taskList: taskList,
        isEveryDay: true,
      });
    });
  };

  const setRealmUser = () => {
    realm.write(() => {
      realm.create('User', {
        _id: userId,
        language: getLng(),
        isDarkMode: false,
        outingList: outingList,
      });
    });
  };

  const deleteAllRealmData = () => {
    realm.write(() => {
      realm.deleteAll();
    });
  };

  const onPress = async (isOK: boolean) => {
    deleteAllRealmData(); // 임시 코드

    const {isNotify, outingTimeNotifiId} = await setNotifeeOutingTime({
      isOK: isOK,
    });

    setRealmTask({isNotify});
    setRealmOuting({isNotify, outingTimeNotifiId});
    setRealmUser();

    navigation.reset({
      routes: [{name: 'MainScreen'}],
    });
    //   : console.log('경고창 띄우기');
  };

  return (
    <SafeAreaView>
      <RealmPlugin realms={[realm]} />
      <Stepper pos={3} />
      <View>
        <Text>외출 전 알림을 받으면</Text>
        <Text>까먹지 않고 실천할 수 있어요.</Text>
        <Text>외출 후 "아 까먹었다!" 하는 일이 없도록 도와줄게요.</Text>
      </View>
      <View>
        <Image source={testImg} style={{width: 100, height: 100}} />
      </View>
      <View>
        <DefaultButton
          id="alarm-on"
          text="알림을 받을게요!"
          onPress={() => onPress(true)}
        />
        <DefaultButton
          id="alarm-off"
          text="안 받을게요."
          onPress={() => onPress(false)}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationRequestScreen;
