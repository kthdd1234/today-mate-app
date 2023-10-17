import {Text, View, Image} from 'react-native';
import DefaultButton from '../../components/button/defaultButton';
import Stepper from '../../components/step/stepper';
import {useRecoilValue} from 'recoil';
import {
  outingTimeSettingValuesAtom,
  safetySelectedIdsAtom,
  takingSelectedIdsAtom,
  todoSelectedIdsAtom,
} from '../../states';
import {useQuery, useRealm} from '@realm/react';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import {getLocales} from 'react-native-localize';
import {
  safetyInspectionItems,
  takinkThingItems,
  todoWorkItems,
} from '../../constants';
import {eLabel} from '../../types/enum';
import {
  ISetRealmTask,
  ISetRealmOuting,
  ISetRealmUser,
} from '../../types/interface';
import {useTranslation} from 'react-i18next';
import {Task} from '../../schema/TaskSchema';
import {Outing} from '../../schema/OutingSchema';
import {momentBeforeFormatter, momentFormatter} from '../../utils';
import RealmPlugin from 'realm-flipper-plugin-device';
import {v4 as uuid} from 'uuid';
import moment from 'moment';

const testImg = require('../../images/test-img.png');

const {Safety, Taking, Todo} = eLabel;

const AlarmRequestScreen = ({navigation}) => {
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
  const {ampm, hour, minute} = useRecoilValue(outingTimeSettingValuesAtom);
  const safetySelectedIds = useRecoilValue(safetySelectedIdsAtom);
  const takingSelectedIds = useRecoilValue(takingSelectedIdsAtom);
  const todoSelectedIds = useRecoilValue(todoSelectedIdsAtom);

  const setNotifee = async (isOK: boolean) => {
    if (isOK) {
      const settings = await notifee.requestPermission();
      return settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
    }

    return false;
  };

  const setRealmTask = ({task}: ISetRealmTask) => {
    const taskInfo = {
      Safety: {
        id: Safety,
        selectedIds: safetySelectedIds,
        items: safetyInspectionItems,
      },
      Taking: {
        id: Taking,
        selectedIds: takingSelectedIds,
        items: takinkThingItems,
      },
      Todo: {id: Todo, selectedIds: todoSelectedIds, items: todoWorkItems},
    };

    const taskArg = taskInfo[task];

    return taskArg.selectedIds.map(id => {
      const item = taskArg.items[id];

      realm.write(() => {
        realm.create('Task', {
          _id: uuid(),
          outingId: outingId,
          label: taskArg.id,
          emoji: item.emoji,
          name: t(`${item.text}`),
          isChecked: false,
        });
      });
    });
  };

  const setRealmOuting = ({isAlarm}: ISetRealmOuting) => {
    const now = moment();
    const outingTime = momentFormatter({
      year: now.format('YYYY'),
      month: now.format('MM'),
      day: now.format('DD'),
      ampm: ampm,
      hour: hour,
      minute: minute,
    });

    const beforeOutingTime = momentBeforeFormatter({
      formatString: outingTime,
      minute: 10,
    });

    realm.write(() => {
      realm.create('Outing', {
        _id: outingId,
        outingTime: outingTime,
        isOutingTimeAlarm: isAlarm,
        isEveryDay: true,
        beforeOutingTime: isAlarm ? beforeOutingTime : null,
        isBeforeOutingTimeAlarm: isAlarm,
        taskList: taskList,
      });
    });
  };

  const setRealmUser = ({isAlarm}: ISetRealmUser) => {
    const language = getLocales()[0].languageCode;

    realm.write(() => {
      realm.create('User', {
        _id: userId,
        language: language,
        isDarkMode: false,
        isAlarm: isAlarm,
        outingList: outingList,
      });
    });
  };

  const deleteAllRealmData = () => {
    realm.write(() => {
      realm.deleteAll();
    });
  };

  const setRealm = async (isAlarm: boolean) => {
    deleteAllRealmData();

    setRealmTask({task: 'Safety'});
    setRealmTask({task: 'Taking'});
    setRealmTask({task: 'Todo'});

    setRealmOuting({isAlarm: isAlarm});
    setRealmUser({isAlarm: isAlarm});

    return true;
  };

  const onPress = async (isOK: boolean) => {
    const isAlarm = await setNotifee(isOK);
    const isSaveInRealm = await setRealm(isAlarm);

    return isSaveInRealm
      ? navigation.reset({
          routes: [{name: 'MainScreen'}],
        })
      : console.log('경고창 띄우기');
  };

  return (
    <View>
      <RealmPlugin realms={[realm]} />
      <Stepper pos={4} />
      <View>
        <Text>외출 전 알람을 받으면</Text>
        <Text>까먹지 않고 실천할 수 있어요.</Text>
        <Text>외출 후 "아 까먹었다!" 하는 일이 없도록 도와줄게요.</Text>
      </View>
      <View>
        <Image source={testImg} style={{width: 100, height: 100}} />
      </View>
      <View>
        <DefaultButton
          id="alarm-on"
          text="알람을 받을게요!"
          onPress={() => onPress(true)}
        />
        <DefaultButton
          id="alarm-off"
          text="안 받을게요."
          onPress={() => onPress(false)}
        />
      </View>
    </View>
  );
};

export default AlarmRequestScreen;
