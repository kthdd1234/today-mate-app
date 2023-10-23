import {SafeAreaView} from 'react-native';
import Stepper from '../../components/step/stepper';
import DefaultButton from '../../components/button/defaultButton';
import {useTranslation} from 'react-i18next';
import SelectItemsSection from '../../components/section/SelectItemsSection';
import {beforeOutingTimeItems} from '../../constants';
import {useSetRecoilState} from 'recoil';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useRef, useState} from 'react';
import {beforeOutingMinuteAtom} from '../../states';
import {openBottomSheetModal} from '../../utils/gorhom';
import format from 'string-format';
import OutingReadyMinuteBottomSheet from '../../components/bottomSheet/OutingReadyMinuteBottomSheet';

const OutingReadyScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /**  useSetRecoilState */
  const setBeforeOutingMinute = useSetRecoilState(beforeOutingMinuteAtom);

  /** useState */
  const [beforeOutingTimeState, setBeforeOutingTimeState] = useState(
    beforeOutingTimeItems,
  );
  const [selectedId, setSelectedId] = useState<string>('');

  /** useRef */
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onPressItem = (id: string) => {
    if (id === '6') {
      return openBottomSheetModal(bottomSheetModalRef);
    }

    setSelectedId(id);
    setBeforeOutingMinute(beforeOutingTimeState[id].minute);
  };

  const onPressNext = () => {
    navigation.navigate('NotificationRequestScreen');
  };

  const onPressCompletedBottomSheet = ({
    hour,
    minute,
  }: {
    hour: string;
    minute: string;
  }) => {
    const formatString =
      hour === '0'
        ? format('{}분 전', minute)
        : format('{}시간 {}분 전', hour, minute);

    beforeOutingTimeState[6].text = t(formatString);

    setBeforeOutingTimeState([...beforeOutingTimeState]);
    setSelectedId('6');
  };

  return (
    <SafeAreaView className="h-full">
      <Stepper pos={2} />
      <SelectItemsSection
        title="외출 준비는 보통 몇분(또는 몇시간) 전에 해요?"
        renderList={beforeOutingTimeState}
        selectedIds={[selectedId]}
        onPress={onPressItem}
      />
      <OutingReadyMinuteBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        onPressCompleted={onPressCompletedBottomSheet}
      />
      <DefaultButton id="next-btn" text={t('다음')} onPress={onPressNext} />
    </SafeAreaView>
  );
};

export default OutingReadyScreen;
