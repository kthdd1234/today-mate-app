import {outingReadyItemList} from '../../constants';
import {useSetRecoilState} from 'recoil';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useRef, useState} from 'react';
import {openBottomSheetModal} from '../../utils/gorhom';
import format from 'string-format';
import {outingReadyAtom} from '../../states';
import OnBoarding from '../../components/onboarding/OnBoarding';
import {useTranslation} from 'react-i18next';
import {ITimeParams} from '../../types/interface';
import TimeSettingBottomSheet from '../../components/bottomSheet/TimeSettingBottomSheet';

const OutingReadyScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** lastIndex */
  const lastIndex = outingReadyItemList.length - 1;

  /**  useSetRecoilState */
  const setOutingReady = useSetRecoilState(outingReadyAtom);

  /** useState */
  const [itemList, setItemList] = useState(outingReadyItemList);
  const [selectedId, setSelectedId] = useState<string>('');

  /** useRef */
  const ref = useRef<BottomSheetModal>(null);

  const onNext = ({outingReady}: {outingReady: string}) => {
    navigation.navigate('??');
    setOutingReady(outingReady);
  };

  const onPressListItem = (id: string) => {
    if (id === lastIndex.toString()) {
      openBottomSheetModal(ref);
    } else {
      setSelectedId(id);
      onNext(outingReadyItemList[id].minute);
    }
  };

  const onCompletedBottomSheet = ({hour, minute}: ITimeParams) => {
    const minuteString = `${Number(hour) * 60 + minute}`;

    const formatString =
      hour === '0'
        ? format('{}분', minuteString)
        : format('{}시간 {}분', hour, minuteString);

    setItemList[lastIndex].text = t(formatString);
    setSelectedId(`${lastIndex}`);

    onNext({outingReady: minuteString});
  };

  return (
    <OnBoarding
      step={4}
      title="외출 준비 시간은 보통 얼머나 걸려요?"
      list={itemList}
      selectedIds={[selectedId]}
      onPressListItem={onPressListItem}
      bottomSheetModal={
        <TimeSettingBottomSheet
          ref={ref}
          isAmpm={false}
          onPressCompleted={onCompletedBottomSheet}
        />
      }
    />
  );
};

export default OutingReadyScreen;
