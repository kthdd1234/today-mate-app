import {View} from 'react-native';
import Stepper from '../../components/step/stepper';
import DefaultButton from '../../components/button/defaultButton';
import {useTranslation} from 'react-i18next';
import ChipSection from '../../components/section/ChipSection';
import TimeSettingBottomSheet from '../../components/bottomSheet/TimeSettingBottomSheet';
import {
  convertTimeToMinute,
  getTimeFormatString,
  outingReadyItemList,
} from '../../constants';
import {outingReadyAtom} from '../../states';
import {useSetRecoilState} from 'recoil';
import {useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {openBottomSheetModal} from '../../utils/gorhom';
import {ITimeParams} from '../../types/interface';

const ThirdScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** lastIndex */
  const outingReadyLastIndex = outingReadyItemList.length - 1;

  /** useSetRecoilState */
  const setOutingReadyAtom = useSetRecoilState(outingReadyAtom);

  /** useState */
  const [outingReadyState, setOutingReadyState] = useState(outingReadyItemList);
  const [outingReadyId, setOutingReadyId] = useState('');

  /** useRef */
  const outingReadyRef = useRef<BottomSheetModal>(null);

  const onNext = () => {
    if (outingReadyId !== '') {
      const outingReadyItem = outingReadyState[outingReadyId];

      setOutingReadyAtom(outingReadyItem.minute);

      navigation.navigate('FourScreen');
    }
  };

  const onPressOutingReadyItem = (id: string) => {
    id === outingReadyLastIndex.toString()
      ? openBottomSheetModal(outingReadyRef)
      : setOutingReadyId(id);
  };

  const onCompletedOutingReadyBottomSheet = ({hour, minute}: ITimeParams) => {
    const [Hour, Minute] = [Number(hour), Number(minute)];
    const timeText = getTimeFormatString({
      hour: Hour,
      minute: Minute,
    });

    outingReadyState[outingReadyLastIndex].text = timeText;
    outingReadyState[outingReadyLastIndex].minute = convertTimeToMinute({
      hour: Hour,
      minute: Minute,
    });

    setOutingReadyState([...outingReadyState]);
    setOutingReadyId(`${outingReadyLastIndex}`);
  };

  return (
    <View>
      <Stepper step={3} />
      <ChipSection
        title="외출 준비는 보통 얼마나 걸리나요?"
        chips={outingReadyState.map(state => state.text)}
        selectedIds={[outingReadyId]}
        bottomSheet={
          <TimeSettingBottomSheet
            targetRef={outingReadyRef}
            isAmpm={false}
            onPressCompleted={onCompletedOutingReadyBottomSheet}
          />
        }
        onPress={onPressOutingReadyItem}
      />
      <DefaultButton id="next-btn" text={t('다음')} onPress={onNext} />
    </View>
  );
};

export default ThirdScreen;
