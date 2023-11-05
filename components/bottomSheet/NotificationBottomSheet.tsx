import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import DefaultButton from '../button/DefaultButton';
import SeletedButton from '../button/SelectedButton';
import {useMemo, useCallback, useState, useEffect} from 'react';
import {INotificationBottomSheet} from '../../types/interface';
import {repeatTypes, days} from '../../constants';
import {closeBottomSheetModal} from '../../utils/gorhom';

const NotificationBottomSheet = ({
  initState,
  targetRef,
  onCompleted,
}: INotificationBottomSheet) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useState */
  const [selectedRepeatType, setSelectedRepeatType] = useState('');
  const [selectedDaysIds, setSelectedDaysIds] = useState<string[]>([]);

  // variables
  useEffect(() => {
    console.log(initState);
  }, [initState]);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

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

  const onPressRepeatButton = (type: string) => {
    setSelectedRepeatType(type);
  };

  const onPressDaysButton = (id: string) => {
    const isDays = selectedDaysIds.includes(id as never);

    if (isDays) {
      setSelectedDaysIds([...selectedDaysIds, id]);
    } else {
      selectedDaysIds.splice(Number(id), 1);
      setSelectedDaysIds(selectedDaysIds);
    }
  };

  const onPressCompletedButton = _ => {
    closeBottomSheetModal(targetRef);
    onCompleted({repeatType: selectedRepeatType, days: selectedDaysIds});
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        index={0}
        ref={targetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}>
        <View>
          <View>
            <Text>{t('외출 준비 알림')}</Text>
          </View>
          <View className="flex-row">
            <View>
              <Text>{t('반복 주기')}</Text>
            </View>
            <View className="flex-row">
              {repeatTypes.map(info => (
                <SeletedButton
                  key={info.id}
                  id={info.id}
                  selectedIds={[selectedRepeatType]}
                  text={info.text}
                  onPress={onPressRepeatButton}
                />
              ))}
            </View>
          </View>
          <View className="flex-row">
            {days.map(info => (
              <SeletedButton
                key={info.id}
                id={info.id}
                selectedIds={selectedDaysIds}
                text={info.text}
                onPress={onPressDaysButton}
              />
            ))}
          </View>

          <DefaultButton
            id="miute-setting"
            isEnable={false}
            text={t('완료')}
            onPress={onPressCompletedButton}
          />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default NotificationBottomSheet;
// Monday: 월요일;
// Tuesday: 화요일;
// Wednesday: 수요일;
// Thursday: 목요일;
// Friday: 금요일;
// Saturday: 토요일;
// Sunday: 일요일;
