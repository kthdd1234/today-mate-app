import {View, Text, Image} from 'react-native';
import {useEffect, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import DefaultButton from '../../components/button/defaultButton';
import {useRecoilState} from 'recoil';
import {isAlarmOutingTimeAtom, outingTimeSettingValuesAtom} from '../../states';
import OutingTimeSettingBottomSheet from '../../components/bottomSheet/OutingTimeSettingBottomSheet';
import {Switch} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const testImg = require('../../images/test-img.png');

const OutingTimeScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

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

  const onOpenOutingTime = () => {
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
      <Text>{t('몇시에 외출하나요?')}</Text>
      <Image className="w-10 h-10" source={testImg} />
      <DefaultButton
        id="outing-time"
        text={`${t('외출 시간')}: ${t(`${time}`)} ${hour}:${minute}`} // 오전/오후은 앞으로, PM/AM 은 뒤로, localDB 정보 가져오기
        onPress={onOpenOutingTime}
      />
      <Text>{t('외출 알림')}: </Text>
      <Switch value={isAlarmOutingTime} onValueChange={onToggleSwitchButton} />
      <Text>{t('외출 전 알림 메세지를 보내 드려요.')}</Text>
      <DefaultButton id="next-btn" text={t('다음')} onPress={onPressNext} />
      <OutingTimeSettingBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
};

export default OutingTimeScreen;
// {['ko', 'en'].map(value => (
//   <Button
//     key={value}
//     title={value}
//     onPress={() => i18n.changeLanguage(value)}
//   />
// ))}
