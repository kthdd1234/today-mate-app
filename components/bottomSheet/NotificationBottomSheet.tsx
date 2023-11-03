import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import DefaultButton from '../button/defaultButton';
import {useMemo, useCallback, useState} from 'react';
import {INotificationBottomSheet} from '../../types/interface';

const NotificationBottomSheet = ({
  initState,
  targetRef,
  onCompleted,
}: INotificationBottomSheet) => {
  /** useTranslation */
  const {t} = useTranslation();

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

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const onPressRepeatButton = (id: string) => {
    //
  };

  const onPressCompletedButton = () => {
    //
  };

  const repeatInfo = [
    {id: 'None', text: '없음'},
    {id: 'everayWeek', text: '매주'},
  ];

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        index={0}
        ref={targetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}>
        <View>
          <View>
            <Text>{t('외출 준비 알림')}</Text>
          </View>
          <View>
            <View>
              <Text>{t('반복 주기')}</Text>
            </View>
            <View>
              <DefaultButton
                id="None"
                text={t('없음')}
                onPress={onPressRepeatButton}
              />
              <DefaultButton
                id="everayWeek"
                text={t('매주')}
                onPress={onPressRepeatButton}
              />
            </View>
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
