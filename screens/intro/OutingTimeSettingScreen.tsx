import {SafeAreaView} from 'react-native';
import {useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import DefaultButton from '../../components/button/defaultButton';
import {useSetRecoilState} from 'recoil';
import {outingTimeSettingValuesAtom} from '../../states';
import OutingTimeSettingBottomSheet from '../../components/bottomSheet/OutingTimeSettingBottomSheet';
import {useTranslation} from 'react-i18next';
import SelectItemsSection from '../../components/section/SelectItemsSection';
import {outingTimeItems, outingTimeStates} from '../../constants';
import Stepper from '../../components/step/stepper';

const OutingTimeSettingScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilState */
  const setOutingTimeSettingValues = useSetRecoilState(
    outingTimeSettingValuesAtom,
  );

  /** useState */
  const [outingTimeItemState, setOutingTimeItemState] =
    useState(outingTimeItems);
  const [selectedId, setSelectedId] = useState<string>('');

  /** useRef */
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onPressNext = () => {
    navigation.navigate('SafetyBeforeOutingScreen');
  };

  const onPressItem = (id: string) => {
    if (id < '5') {
      const timeState = outingTimeStates[id];
      const {ampm, hour, minute} = timeState;

      setSelectedId(id);
      setOutingTimeSettingValues({ampm, hour, minute});
    } else {
      bottomSheetModalRef.current?.present();
    }
  };

  const onPressCompletedBottomSheet = ({ampm, hour, minute}) => {
    outingTimeItemState[5].text = `${ampm} ${hour}:${minute}`;

    setOutingTimeItemState([...outingTimeItemState]);
    setSelectedId('5');
  };

  return (
    <SafeAreaView className="h-full">
      <Stepper pos={0} />
      <SelectItemsSection
        title="오늘 또는 내일, 몇시에 외출하나요?"
        renderList={outingTimeItemState}
        selectedIds={[selectedId]}
        onPress={onPressItem}
      />
      <DefaultButton id="next-btn" text={t('다음')} onPress={onPressNext} />
      <OutingTimeSettingBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        onPressCompleted={onPressCompletedBottomSheet}
      />
    </SafeAreaView>
  );
};

export default OutingTimeSettingScreen;
// {['ko', 'en'].map(value => (
//   <Button
//     key={value}
//     title={value}
//     onPress={() => i18n.changeLanguage(value)}
//   />
// ))}
//  ${t(`${time}`)} ${hour}:${minute}
