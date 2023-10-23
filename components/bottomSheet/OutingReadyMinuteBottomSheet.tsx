import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import DefaultButton from '../button/defaultButton';
import {useMemo, useCallback, useState} from 'react';
import {IPropsBottomSheet} from '../../types/interface';
import {closeBottomSheetModal} from '../../utils/gorhom';
import TimeSettingSection from '../section/TimeSettingSection';
import {useSetRecoilState} from 'recoil';
import {beforeOutingMinuteAtom} from '../../states';
import {initTimeValues} from '../../constants';

const OutingReadyMinuteBottomSheet = ({
  bottomSheetModalRef,
  onPressCompleted,
}: IPropsBottomSheet) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useState */
  const [timeValues, setTimeValues] = useState(initTimeValues);
  const {hour, minute} = timeValues;

  /** useSetRecoilState */
  const setBeforeOutingTimeItems = useSetRecoilState(beforeOutingMinuteAtom);

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

  const onPressHour = (value: string) => {
    setTimeValues({...timeValues, hour: value});
  };

  const onPressMinute = (value: string) => {
    setTimeValues({...timeValues, minute: value});
  };

  const onPressCompletedButton = () => {
    const m = `${Number(timeValues.hour) * 60 + timeValues.minute}`;

    closeBottomSheetModal(bottomSheetModalRef);
    setBeforeOutingTimeItems(m);
    onPressCompleted({
      ampm: '',
      hour: timeValues.hour,
      minute: timeValues.minute,
    });
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
            states={{hour: hour, minute: minute}}
            onPressed={{
              Time: () => null,
              Hour: onPressHour,
              Minute: onPressMinute,
            }}
          />
          <DefaultButton
            id="miute-setting"
            text={t('완료')}
            onPress={onPressCompletedButton}
          />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default OutingReadyMinuteBottomSheet;
