import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useMemo, useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import DefaultButton from '../button/DefaultButton';
import {ITimeSettingBottomSheet} from '../../types/interface';
import TimeSettingSection from '../section/TimeSettingSection';
import {useTranslation} from 'react-i18next';
import {closeBottomSheetModal} from '../../utils/gorhom';
import {initFullTime} from '../../constants';

const TimeSettingBottomSheet = ({
  isAmpm,
  targetRef,
  onPressCompleted,
}: ITimeSettingBottomSheet) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useState */
  const [timeValues, setTimeValues] = useState(initFullTime);
  const {ampm, hour, minute} = timeValues;

  const onPressTime = (value: string) => {
    setTimeValues({...timeValues, ampm: value});
  };

  const onPressHour = (value: string) => {
    setTimeValues({...timeValues, hour: value});
  };

  const onPressMinute = (value: string) => {
    setTimeValues({...timeValues, minute: value});
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
    closeBottomSheetModal(targetRef);
    onPressCompleted({ampm, hour, minute});
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        index={0}
        ref={targetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}>
        <View>
          <Text>{t('시간 설정')}</Text>
          <TimeSettingSection
            states={{
              ampm: isAmpm ? ampm : undefined,
              hour: hour,
              minute: minute,
            }}
            onPressed={{
              Time: onPressTime,
              Hour: onPressHour,
              Minute: onPressMinute,
            }}
          />
          <DefaultButton
            isEnable={true}
            id="time-setting"
            text={t('완료')}
            onPress={onPressCompletedButton}
          />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default TimeSettingBottomSheet;
