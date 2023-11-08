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
import {repeatTypes, days, initDays} from '../../constants';
import {closeBottomSheetModal} from '../../utils/gorhom';
import {eDayIndex, eRepeatType} from '../../types/enum';

const NotificationBottomSheet = ({
  initState,
  targetRef,
  onCompleted,
}: INotificationBottomSheet) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useState */
  const [selectedRepeatType, setSelectedRepeatType] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>(initDays);
  const [isShowDays, setIsShowDays] = useState(false);

  useEffect(() => {
    setSelectedRepeatType(initState.repeatType);
    setSelectedDays(initState.days);
    setIsShowDays(initState.repeatType === eRepeatType.EveryWeek);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const isEveryWeek = type === eRepeatType.EveryWeek;

    if (isEveryWeek) {
      setIsShowDays(true);
    } else {
      setIsShowDays(false);
      setSelectedDays(initDays);
    }

    setSelectedRepeatType(type);
  };

  const onPressDaysButton = (day: string) => {
    const isDays = selectedDays.includes(day as never);
    const idx = eDayIndex[day];
    const sliceList = selectedDays.slice();

    isDays ? (sliceList[idx] = '') : (sliceList[idx] = day);
    setSelectedDays([...sliceList]);
  };

  const onPressCompletedButton = _ => {
    closeBottomSheetModal(targetRef);
    onCompleted({
      repeatType: selectedRepeatType,
      days: selectedDays.filter(day => !!day),
    });

    setSelectedRepeatType(eRepeatType.None);
    setSelectedDays([]);
    setIsShowDays(false);
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
            <Text>{t('할 일 실천 알림')}</Text>
          </View>
          <View className="flex-row">
            <Text>{t('알림 시간')}</Text>
            <Text>{initState.notificationTime}</Text>
          </View>
          <View className="flex-row">
            <Text>{t('반복 주기')}</Text>
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
          {isShowDays && (
            <View className="flex-row">
              <Text>{t('요일')}</Text>
              <View className="flex-row">
                {days.map(info => (
                  <SeletedButton
                    key={info.id}
                    id={info.id}
                    selectedIds={selectedDays}
                    text={info.text}
                    onPress={onPressDaysButton}
                  />
                ))}
              </View>
            </View>
          )}

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
