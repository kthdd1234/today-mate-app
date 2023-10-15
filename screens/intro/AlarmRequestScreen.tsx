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
import {useRealm} from '@realm/react';
import notifee, {AuthorizationStatus} from '@notifee/react-native';

const testImg = require('../../images/test-img.png');

const AlarmRequestScreen = ({navigation}) => {
  /** useRecoilValue */
  const outingTimeSettingValues = useRecoilValue(outingTimeSettingValuesAtom);
  const safetySelectedIds = useRecoilValue(safetySelectedIdsAtom);
  const takingSelectedIds = useRecoilValue(takingSelectedIdsAtom);
  const todoSelectedIds = useRecoilValue(todoSelectedIdsAtom);

  /** useRealm */
  // const realm = useRealm();

  const setNotifee = async (isOK: boolean) => {
    if (isOK) {
      const settings = await notifee.requestPermission();
      return settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
    }

    return false;
  };

  const setRealm = async (isAlarm: boolean) => {
    //
    return false;
  };

  const onPress = async (isOK: boolean) => {
    const isAlarm = await setNotifee(isOK);
    const isSaveInRealm = await setRealm(isAlarm);

    return isSaveInRealm
      ? navigation.navigate('MainScreen')
      : console.log('경고창 띄우기');
  };

  return (
    <View>
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
