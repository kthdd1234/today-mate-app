import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useMemo, useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import DefaultButton from '../button/defaultButton';
import {IPropsBottomSheet} from '../../types/interface';
import TimeSettingSection from '../section/OutingTimeSettingSection';
import {initOutingTime, outingTimeSettingValuesAtom} from '../../states';
import {useSetRecoilState} from 'recoil';

const OutingTimeSettingBottomSheet = ({
  bottomSheetModalRef,
}: IPropsBottomSheet) => {
  /** useState */
  const [outingTimeValues, setOutingTimeValues] = useState(initOutingTime);
  const {time, hour, minute} = outingTimeValues;

  /** useSetRecoilState */
  const setOutingTimeSettingValues = useSetRecoilState(
    outingTimeSettingValuesAtom,
  );

  const onPressTime = (value: string) => {
    setOutingTimeValues({...outingTimeValues, time: value});
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
    bottomSheetModalRef?.current?.close();
    setOutingTimeSettingValues({time, hour, minute});
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
          <Text>시간 설정</Text>
          <TimeSettingSection
            states={{time: time, hour: hour, minute: minute}}
            onPressed={{
              Time: onPressTime,
              Hour: onPressHour,
              Minute: onPressMinute,
            }}
          />
          <DefaultButton
            id="time-setting"
            text="완료"
            onPress={onPressCompletedButton}
          />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default OutingTimeSettingBottomSheet;