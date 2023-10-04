import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useMemo, useCallback} from 'react';
import {Text, View} from 'react-native';
import DefaultButton from '../button/defaultButton';
import {ITimeSettingBottomSheet} from '../../types/interface';
import TimeSettingSection from '../section/TimeSettingSection';

const TimeSettingBottomSheet = ({
  bottomSheetModalRef,
  onCompleted,
}: ITimeSettingBottomSheet) => {
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
          <TimeSettingSection />
          <DefaultButton id="time-setting" text="완료" onPress={onCompleted} />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default TimeSettingBottomSheet;
