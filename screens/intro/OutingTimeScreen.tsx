import {View, Text, Image} from 'react-native';
import {useEffect, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import DefaultButton from '../../components/button/defaultButton';
import {useRecoilState} from 'recoil';
import {isAlarmOutingTimeAtom, outingTimeSettingValuesAtom} from '../../states';
import OutingTimeSettingBottomSheet from '../../components/bottomSheet/OutingTimeSettingBottomSheet';
import {Switch} from 'react-native-paper';

const testImg = require('../../images/test-img.png');

const OutingTimeScreen = ({navigation}) => {
  /** useRecoilState */
  const [outingTimeSettingValues, setOutingTimeSettingValues] = useRecoilState(
    outingTimeSettingValuesAtom,
  );
  const [isAlarmOutingTime, setIsAlarmOutingTime] = useRecoilState(
    isAlarmOutingTimeAtom,
  );

  const {time, hour, minute} = outingTimeSettingValues;

  useEffect(() => {
    const today = new Date();
    const localTime = today
      .toLocaleTimeString('ko-KR', {hour: 'numeric'}) // local setting 필요
      .split(' ')
      .sort()[1];

    setOutingTimeSettingValues({time: localTime, hour: '9', minute: '30'});
  }, [setOutingTimeSettingValues]);

  /** useRef */
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onPressOpenOutingTime = () => {
    bottomSheetModalRef.current?.present();
  };

  const onPressNext = () => {
    navigation.navigate('TodoSettingScreen');
  };

  const onToggleSwitchButton = (newValue: boolean) => {
    setIsAlarmOutingTime(newValue);
  };

  return (
    <View className="h-full">
      <Text>몇시에 외출하나요?</Text>
      <Image className="w-10 h-10" source={testImg} />
      <DefaultButton
        id={'outing-time'}
        text={`외출 시간: ${time} ${hour}시 ${minute}분`}
        onPress={onPressOpenOutingTime}
      />
      <Text>외출 알림: </Text>
      <Switch value={isAlarmOutingTime} onValueChange={onToggleSwitchButton} />
      <Text>외출 전 실천한 일을 체크하는 알림을 보내 드려요.</Text>
      <DefaultButton id="next-btn" text="다음" onPress={onPressNext} />
      <OutingTimeSettingBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
};

export default OutingTimeScreen;
