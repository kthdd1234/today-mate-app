import {useTranslation} from 'react-i18next';
import {SafeAreaView, Text, View} from 'react-native';
import DefaultButton from '../../components/button/defaultButton';
import Stepper from '../../components/step/stepper';
import RealmPlugin from 'realm-flipper-plugin-device';
import {useQuery, useRealm} from '@realm/react';
import {Task} from '../../schema/TaskSchema';
import {Item} from '../../schema/ItemSchema';
import {useRecoilValue} from 'recoil';
import format from 'string-format';
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
  todoAtom,
  earlyArrivalAtom,
} from '../../states';

const FourScreen = () => {
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
  const earlyArrivalTime = useRecoilValue(earlyArrivalAtom);
  const todo = useRecoilValue(todoAtom);

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

  const onPressButton = (isAllow: boolean) => {
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
          id="allow-btn"
          text={t('알림을 받을게요!')}
          onPress={() => onPressButton(true)}
        />
        <DefaultButton
          id="reject-btn"
          text={t('아니요. 안 받을게요.')}
          onPress={() => onPressButton(false)}
        />
      </View>
    </SafeAreaView>
  );
};

export default FourScreen;
