import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ICreateItemBottomSheet} from '../../types/interface';
import {useTranslation} from 'react-i18next';
import DefaultButton from '../button/DefaultButton';
import {closeBottomSheetModal} from '../../utils/gorhom';
import {getUniqueId} from '../../constants';

const CreateItemBottomSheet = ({
  initState,
  targetRef,
  onCompleted,
}: ICreateItemBottomSheet) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useState */
  const [text, setText] = useState('');

  // variables
  const snapPoints = useMemo(() => ['15%'], []);

  useEffect(() => {
    console.log('뭐고', initState);
    setText(initState);
  }, [initState]);

  const onChangeText = (value: string) => setText(value);

  // const onDismiss = () => setText('');

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

  const onPressCompleted = () => {
    const id = getUniqueId(0);

    closeBottomSheetModal(targetRef);
    onCompleted({id, text});
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        index={0}
        ref={targetRef}
        snapPoints={snapPoints}
        // onDismiss={onDismiss}
        backdropComponent={renderBackdrop}>
        <View className="z-0 flex-row">
          <View className="grow">
            <BottomSheetTextInput
              style={styles.textInput}
              autoFocus={true}
              value={text}
              onChangeText={onChangeText}
              onSubmitEditing={onPressCompleted}
            />
          </View>
          <View className="flex-none">
            <DefaultButton
              id="complete"
              text={t('완료')}
              onPress={onPressCompleted}
            />
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'stretch',
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    color: 'black',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});

export default CreateItemBottomSheet;
