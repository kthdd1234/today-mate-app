import {SafeAreaView} from 'react-native';
import Stepper from '../../components/step/stepper';
import ChipSection from '../../components/section/ChipSection';
import TimeSettingBottomSheet from '../../components/bottomSheet/TimeSettingBottomSheet';
import DefaultButton from '../../components/button/DefaultButton';
import {useTranslation} from 'react-i18next';
import {
  convertTimeToMinute,
  destinationTimeItemList,
  earlyArrivalItemList,
  getTimeFormatString,
} from '../../constants';
import {useSetRecoilState} from 'recoil';
import {destinationTimeAtom, earlyStartAtom} from '../../states';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useRef, useState} from 'react';
import {openBottomSheetModal} from '../../utils/gorhom';
import {ITimeParams} from '../../types/interface';

const SecondScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** lastIndex */
  const destinationTimeLastIdx = destinationTimeItemList.length - 1;
  const earlyArrivalLastIdx = earlyArrivalItemList.length - 1;

  /** useSetRecoilState */
  const setDestinationAtom = useSetRecoilState(destinationTimeAtom);
  const setearlyStartAtom = useSetRecoilState(earlyStartAtom);

  /** useState */
  const [destinationTimeState, setDestinationTimeState] = useState(
    destinationTimeItemList,
  );
  const [earlyArrivalState, setEarlyArrivalState] =
    useState(earlyArrivalItemList);
  const [destinationTimeId, setDestinationTimeId] = useState('');
  const [earlyArrivalId, setEarlyArrivalId] = useState('');

  /** useRef */
  const destinationTimeRef = useRef<BottomSheetModal>(null);
  const earlyArrivalRef = useRef<BottomSheetModal>(null);

  const onNext = () => {
    if (destinationTimeId !== '' && earlyArrivalId !== '') {
      const destinationTimeItem = destinationTimeItemList[destinationTimeId];
      const earlyArrivalItem = earlyArrivalItemList[earlyArrivalId];

      setDestinationAtom(destinationTimeItem.minute);
      setearlyStartAtom(earlyArrivalItem.minute);

      navigation.navigate('ThirdScreen');
    }
  };

  const onPressDestinationTimeItem = (id: string) => {
    id === destinationTimeLastIdx.toString()
      ? openBottomSheetModal(destinationTimeRef)
      : setDestinationTimeId(id);
  };

  const onPressEarlyArrivalItem = (id: string) => {
    id === earlyArrivalLastIdx.toString()
      ? openBottomSheetModal(earlyArrivalRef)
      : setEarlyArrivalId(id);
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

  const onCompletedEarlyArrivalBottomSheet = ({hour, minute}: ITimeParams) => {
    const [Hour, Minute] = [Number(hour), Number(minute)];
    const timeText = getTimeFormatString({
      hour: Hour,
      minute: Minute,
    });

    earlyArrivalState[earlyArrivalLastIdx].text = timeText;
    earlyArrivalState[earlyArrivalLastIdx].minute = convertTimeToMinute({
      hour: Hour,
      minute: Minute,
    });

    setEarlyArrivalState([...earlyArrivalState]);
    setEarlyArrivalId(`${earlyArrivalLastIdx}`);
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
        title="지각하지 않으려면 일찍 출발하는 것이 좋아요.\n몇분 일찍 출발 할까요?"
        chips={earlyArrivalState.map(state => state.text)}
        selectedIds={[earlyArrivalId]}
        onPress={onPressEarlyArrivalItem}
      />
      <TimeSettingBottomSheet
        targetRef={destinationTimeRef}
        isAmpm={false}
        onPressCompleted={onCompletedDestinationTimeBottomSheet}
      />
      <TimeSettingBottomSheet
        targetRef={earlyArrivalRef}
        isAmpm={false}
        onPressCompleted={onCompletedEarlyArrivalBottomSheet}
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
