import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import DefaultButton from '../button/DefaultButton';
import SeletedButton from '../button/SeletedButton';
import {useMemo, useCallback, useState} from 'react';
import {INotificationBottomSheet} from '../../types/interface';
import {repeatInfo, daysInfo} from '../../constants';

const NotificationBottomSheet = ({
  initState,
  targetRef,
  onCompleted,
}: INotificationBottomSheet) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useState */
  const [selectedRepeatId, setSelectedRepeatId] = useState('');
  const [selectedDaysIds, setSelectedDaysIds] = useState([]);

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

  const onPressRepeatButton = (id: string) => {
    //
  };

  const onPressCompletedButton = () => {
    //
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
              {repeatInfo.map(info => (
                <SeletedButton
                  key={info.id}
                  selectedIds={[selectedRepeatId]}
                  text={info.text}
                  onPress={onPressRepeatButton}
                />
              ))}
            </View>
          </View>
          <View className="flex-row">
            {daysInfo.map(info => (
              <SeletedButton
                key={info.id}
                selectedIds={selectedDaysIds}
                text={info.text}
                onPress={onPressRepeatButton}
              />
            ))}
          </View>

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

export default NotificationBottomSheet;
// Monday: 월요일;
// Tuesday: 화요일;
// Wednesday: 수요일;
// Thursday: 목요일;
// Friday: 금요일;
// Saturday: 토요일;
// Sunday: 일요일;
