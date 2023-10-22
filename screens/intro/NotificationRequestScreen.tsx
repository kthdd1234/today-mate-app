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
import {getLocales} from 'react-native-localize';
import {
  notifiCategories,
  outingTimeNotifiMessage,
  beforeOutingTimeNotifiMessage,
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

  // const getTasks = (task: string) => {
  //   const data = taskInfo[task];

  //   return data.selectedIds.map(id => {
  //     const item = data.items[id];

  //     return {
  //       _id: uuid(),
  //       outingId: outingId,
  //       label: data.id,
  //       emoji: item.emoji,
  //       name: t(`${item.text}`),
  //       isChecked: false,
  //     };
  //   });
  // };

  const setNotifee = async ({isOK}: {isOK: boolean}) => {
    const notificationInfo: {
      isNotify: boolean;
      outingTimeNotifiId: string | null;
      beforeOutingTimeNotifiId: string | null;
    } = {
      isNotify: false,
      outingTimeNotifiId: null,
      beforeOutingTimeNotifiId: null,
    };

    if (isOK) {
      const isPermission = await requestNotificationPermission();

      if (isPermission) {
        const allTaskLength = [...todoSelectedIds].length.toString();

        await cancelAllNotification();

        await setNotificationCategories({
          outingTitle: t(notifiCategories.outingCId),
          taskTitle: t(notifiCategories.taskCId),
        });

        const outingTime = getOutingTime();
        const outingTimeNotifiId = await createTriggerNotification({
          title: t(outingTimeNotifiMessage.title),
          body: format(t(outingTimeNotifiMessage.body), allTaskLength),
          dateTime: outingTime,
          repeat: RepeatFrequency.DAILY,
          categoryId: 'outing',
        });

        const beforeOutingTimeNotifiId = await createTriggerNotification({
          title: format(
            t(beforeOutingTimeNotifiMessage.title),
            beforeOutingTime,
          ),
          body: format(t(beforeOutingTimeNotifiMessage.body), allTaskLength),
          dateTime: momentBeforeFormatter({
            formatString: outingTime,
            minute: parseInt(beforeOutingTime, 10),
          }),
          repeat: RepeatFrequency.DAILY,
          categoryId: 'outing',
        });

        notificationInfo.isNotify = true;
        notificationInfo.outingTimeNotifiId = outingTimeNotifiId;
        notificationInfo.beforeOutingTimeNotifiId = beforeOutingTimeNotifiId;
      }
    }

    return notificationInfo;
  };

  const setRealmTask = () => {
    const allTaskList = [
      ...getTasks('Safety'),
      ...getTasks('Taking'),
      ...getTasks('Todo'),
    ];

    return allTaskList.map(tasks => {
      realm.write(() => {
        realm.create('Task', tasks);
      });
    });
  };

  const setRealmOuting = ({
    isNotify,
    outingTimeNotifiId,
    beforeOutingTimeNotifiId,
  }: ISetRealmOuting) => {
    const outingTime = getOutingTime();

    realm.write(() => {
      realm.create('Outing', {
        _id: outingId,
        outingTime: outingTime,
        isNotifyOutingTime: isNotify,
        outingTimeNotifiId: outingTimeNotifiId,
        beforeOutingTime: isNotify ? beforeOutingTime : null,
        isNotifyBeforeOutingTime: isNotify,
        beforeOutingTimeNotifiId: beforeOutingTimeNotifiId,
        taskList: taskList,
        isEveryDay: true,
      });
    });
  };

  const setRealmUser = () => {
    const language = getLocales()[0].languageCode;

    realm.write(() => {
      realm.create('User', {
        _id: userId,
        language: language,
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
    const {isNotify, outingTimeNotifiId, beforeOutingTimeNotifiId} =
      await setNotifee({
        isOK: isOK,
      });

    deleteAllRealmData();
    setRealmTask();
    setRealmOuting({isNotify, outingTimeNotifiId, beforeOutingTimeNotifiId});
    setRealmUser();

    navigation.reset({
      routes: [{name: 'MainScreen'}],
    });

    // return isSaveInRealm
    //   ? navigation.reset({
    //       routes: [{name: 'MainScreen'}],
    //     })
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
