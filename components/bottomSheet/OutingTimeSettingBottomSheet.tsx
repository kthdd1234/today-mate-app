import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useMemo, useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import DefaultButton from '../button/defaultButton';
import {IPropsBottomSheet} from '../../types/interface';
import TimeSettingSection from '../section/TimeSettingSection';
import {initOutingTimeValues, outingTimeValuesAtom} from '../../states';
import {useSetRecoilState} from 'recoil';
import {useTranslation} from 'react-i18next';
import {closeBottomSheetModal} from '../../utils/gorhom';

const OutingTimeSettingBottomSheet = ({
  bottomSheetModalRef,
  onPressCompleted,
}: IPropsBottomSheet) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useState */
  const [outingTimeValues, setOutingTimeValues] =
    useState(initOutingTimeValues);
  const {ampm, hour, minute} = outingTimeValues;

  /** useSetRecoilState */
  const setOutingTimeValuesAtom = useSetRecoilState(outingTimeValuesAtom);

  const onPressTime = (value: string) => {
    setOutingTimeValues({...outingTimeValues, ampm: value});
  };

  const onPressHour = (value: string) => {
    setOutingTimeValues({...outingTimeValues, hour: value});
  };

  const onPressMinute = (value: string) => {
    setOutingTimeValues({...outingTimeValues, minute: value});
  };

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const onPressCompletedButton = () => {
    closeBottomSheetModal(bottomSheetModalRef);

    setOutingTimeValuesAtom({ampm, hour, minute});
    onPressCompleted({ampm, hour, minute});
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        index={0}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}>
        <View>
          <Text>{t('시간 설정')}</Text>
          <TimeSettingSection
            states={{ampm: ampm, hour: hour, minute: minute}}
            onPressed={{
              Time: onPressTime,
              Hour: onPressHour,
              Minute: onPressMinute,
            }}
          />
          <DefaultButton
            id="time-setting"
            text={t('완료')}
            onPress={onPressCompletedButton}
          />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default OutingTimeSettingBottomSheet;
