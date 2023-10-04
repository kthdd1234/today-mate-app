import {View, Text} from 'react-native';
import {useEffect, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import DefaultButton from '../../components/button/defaultButton';
import TimeSettingSection from '../../components/section/TimeSettingSection';
import {useRecoilState} from 'recoil';
import {timeSettingValuesAtom} from '../../states';

const OutingTimeScreen = ({navigation}) => {
  /** useRecoilState */
  const [timeSettingValues, setTimeSettingValues] = useRecoilState(
    timeSettingValuesAtom,
  );

  const {time, hour, miniute} = timeSettingValues;

  useEffect(() => {
    const today = new Date();
    const localTime = today
      .toLocaleTimeString('ko-KR', {hour: 'numeric'}) // local setting 필요
      .split(' ')
      .sort()[1];

    setTimeSettingValues({time: localTime, hour: '9', miniute: '30'});
  }, []);

  const onPressNext = () => {
    navigation.navigate('TodoSettingScreen');
  };

  return (
    <View className="h-full">
      <Text>몇시에 외출하나요?</Text>
      <TimeSettingSection />
      <Text>외출 시간: {`${time} ${hour}시 ${miniute}분`}</Text>
      <DefaultButton id="next-btn" text="다음" onPress={() => onPressNext()} />
    </View>
  );
};

export default OutingTimeScreen;

// /** useRef */
// const bottomSheetModalRef = useRef<BottomSheetModal>(null);

// const onPressOpenOutingTime = () => {
//   bottomSheetModalRef.current?.present();
// };

// const onPressCompleteOutingTime = () => {
//   bottomSheetModalRef.current?.close();
// };
