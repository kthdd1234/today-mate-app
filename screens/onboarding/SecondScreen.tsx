import {SafeAreaView} from 'react-native';
import Stepper from '../../components/step/stepper';
import ChipSection from '../../components/section/ChipSection';
import TimeSettingBottomSheet from '../../components/bottomSheet/TimeSettingBottomSheet';
import DefaultButton from '../../components/button/DefaultButton';
import {useTranslation} from 'react-i18next';
import {
  convertTimeToMinute,
  destinationTimeItemList,
  outingReadyItemList,
  getTimeFormatString,
} from '../../constants';
import {useSetRecoilState} from 'recoil';
import {destinationTimeAtom, outingReadyAtom} from '../../states';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useRef, useState} from 'react';
import {openBottomSheetModal} from '../../utils/gorhom';
import {ITimeParams} from '../../types/interface';

const SecondScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** lastIndex */
  const destinationTimeLastIdx = destinationTimeItemList.length - 1;
  const outingReadyLastIdx = outingReadyItemList.length - 1;

  /** useSetRecoilState */
  const setDestinationTimeAtom = useSetRecoilState(destinationTimeAtom);
  const setOutingReadyAtom = useSetRecoilState(outingReadyAtom);

  /** useState */
  const [destinationTimeState, setDestinationTimeState] = useState(
    destinationTimeItemList,
  );
  const [outingReadyState, setoutingReadyState] = useState(outingReadyItemList);
  const [destinationTimeId, setDestinationTimeId] = useState('');
  const [outingReadyId, setoutingReadyId] = useState('');

  /** useRef */
  const destinationTimeRef = useRef<BottomSheetModal>(null);
  const outingReadyRef = useRef<BottomSheetModal>(null);

  const onNext = () => {
    if (destinationTimeId !== '' && outingReadyId !== '') {
      const destinationTimeItem = destinationTimeItemList[destinationTimeId];
      const outingReadyItem = outingReadyItemList[outingReadyId];

      setDestinationTimeAtom(destinationTimeItem.minute);
      setOutingReadyAtom(outingReadyItem.minute);

      navigation.navigate('ThirdScreen');
    }
  };

  const onPressDestinationTimeItem = (id: string) => {
    id === destinationTimeLastIdx.toString()
      ? openBottomSheetModal(destinationTimeRef)
      : setDestinationTimeId(id);
  };

  const onPressOutingReadyItem = (id: string) => {
    id === outingReadyLastIdx.toString()
      ? openBottomSheetModal(outingReadyRef)
      : setoutingReadyId(id);
  };

  const onCompletedDestinationTimeBottomSheet = ({
    hour,
    minute,
  }: ITimeParams) => {
    const [Hour, Minute] = [Number(hour), Number(minute)];
    const timeText = getTimeFormatString({
      hour: Hour,
      minute: Minute,
    });

    destinationTimeState[destinationTimeLastIdx].text = timeText;
    destinationTimeState[destinationTimeLastIdx].minute = convertTimeToMinute({
      hour: Hour,
      minute: Minute,
    });

    setDestinationTimeState([...destinationTimeState]);
    setDestinationTimeId(`${destinationTimeLastIdx}`);
  };

  const onCompletedOutingReadyBottomSheet = ({hour, minute}: ITimeParams) => {
    const [Hour, Minute] = [Number(hour), Number(minute)];
    const timeText = getTimeFormatString({
      hour: Hour,
      minute: Minute,
    });

    outingReadyState[outingReadyLastIdx].text = timeText;
    outingReadyState[outingReadyLastIdx].minute = convertTimeToMinute({
      hour: Hour,
      minute: Minute,
    });

    setoutingReadyState([...outingReadyState]);
    setoutingReadyId(`${outingReadyLastIdx}`);
  };

  return (
    <SafeAreaView className="h-full">
      <Stepper step={2} />
      <ChipSection
        title="약속 장소까지 가는데 얼마나 걸려요?"
        chips={destinationTimeState.map(state => state.text)}
        selectedIds={[destinationTimeId]}
        onPress={onPressDestinationTimeItem}
      />
      <ChipSection
        title="외출 준비는 보통 얼마나 걸려요?"
        chips={outingReadyState.map(state => state.text)}
        selectedIds={[outingReadyId]}
        onPress={onPressOutingReadyItem}
      />
      <TimeSettingBottomSheet
        targetRef={destinationTimeRef}
        isAmpm={false}
        onPressCompleted={onCompletedDestinationTimeBottomSheet}
      />
      <TimeSettingBottomSheet
        targetRef={outingReadyRef}
        isAmpm={false}
        onPressCompleted={onCompletedOutingReadyBottomSheet}
      />
      <DefaultButton
        id="next-btn"
        text={t('다음')}
        isEnable={false}
        onPress={onNext}
      />
    </SafeAreaView>
  );
};

export default SecondScreen;
{
  /* <ChipSection
        title="지각하지 않으려면 일찍 출발하는 것이 좋아요.\n몇분 일찍 출발 할까요?"
        chips={outingReadyState.map(state => state.text)}
        selectedIds={[outingReadyId]}
        onPress={onPressoutingReadyItem}
      /> */
}
