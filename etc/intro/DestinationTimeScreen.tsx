import {destinationTimeAtom} from '../../states';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import TimeSettingBottomSheet from '../../components/bottomSheet/TimeSettingBottomSheet';
import OnBoarding from '../../components/onboarding/OnBoarding';
import {destinationTimeItemList} from '../../constants';
import {ITimeParams} from '../../types/interface';
import {useTranslation} from 'react-i18next';
import {useRef, useState} from 'react';
import {openBottomSheetModal} from '../../utils/gorhom';
import format from 'string-format';
import {useSetRecoilState} from 'recoil';

const DestinationTimeScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** lastIndex */
  const lastIndex = destinationTimeItemList.length - 1;

  /**  useSetRecoilState */
  const setDestinationTime = useSetRecoilState(destinationTimeAtom);

  /** useState */
  const [itemList, setItemList] = useState(destinationTimeItemList);
  const [selectedId, setSelectedId] = useState<string>('');

  /** useRef */
  const ref = useRef<BottomSheetModal>(null);

  const onNext = (destinationTime: string) => {
    setDestinationTime(destinationTime);

    navigation.push('TodoScreen');
  };

  const onPressListItem = (id: string) => {
    if (id === lastIndex.toString()) {
      openBottomSheetModal(ref);
    } else {
      setSelectedId(id);
      onNext(destinationTimeItemList[id].minute);
    }
  };

  const onCompletedBottomSheet = ({hour, minute}: ITimeParams) => {
    const minuteString = `${Number(hour) * 60 + Number(minute)}`;

    const formatString =
      hour === '0'
        ? format('{}분', minuteString)
        : format('{}시간 {}분', hour, minuteString);

    itemList[lastIndex].text = t(formatString);
    setSelectedId(`${lastIndex}`);

    onNext(minuteString);
  };

  return (
    <OnBoarding
      step={2}
      title="약속 장소까지 가는데 얼마나 걸려요?"
      list={itemList.map(item => item.text)}
      selectedIds={[selectedId]}
      onPressListItem={onPressListItem}
      bottomSheetModal={
        <TimeSettingBottomSheet
          targetRef={ref}
          isAmpm={false}
          onPressCompleted={onCompletedBottomSheet}
        />
      }
    />
  );
};

export default DestinationTimeScreen;
