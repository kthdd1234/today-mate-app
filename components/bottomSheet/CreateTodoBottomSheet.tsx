import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IPropsBottomSheet} from '../../types/interface';
import {useRecoilState} from 'recoil';
import {useTranslation} from 'react-i18next';
import {todoGroupNames} from '../../constants';
import DefaultButton from '../button/defaultButton';
import {eLabel} from '../../types/enum';
import {closeBottomSheetModal} from '../../utils/gorhom';

const {Safety, Taking, Todo} = eLabel;

const CreateTodoBottomSheet = ({bottomSheetModalRef}: IPropsBottomSheet) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilState */
  // const [todoGroupIdState, setTodoGroupIdState] =
  //   useRecoilState(todoGroupIdAtom);
  // const [safetyCheckState, setSafetyCheckState] =
  //   useRecoilState(safetyCheckAtom);
  // const [takingThingsState, setTakingThingsState] =
  //   useRecoilState(takingThingsAtom);
  // const [todoWorkState, setTodoWorkState] = useRecoilState(todoWorkAtom);

  /** useState */
  const [text, setText] = useState('');

  // variables
  const snapPoints = useMemo(() => ['15%'], []);

  const onChangeText = (value: string) => {
    setText(value);
  };

  const onDismiss = () => {
    setText('');
  };

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
    // switch (todoGroupIdState) {
    //   case Safety:
    //     setSafetyCheckState({
    //       ...safetyCheckState,
    //       data: [text, ...safetyCheckState.data.slice()],
    //     });
    //     break;

    //   case Taking:
    //     setTakingThingsState({
    //       ...takingThingsState,
    //       data: [text, ...takingThingsState.data.slice()],
    //     });
    //     break;

    //   case Work:
    //     setTodoWorkState({
    //       ...todoWorkState,
    //       data: [text, ...todoWorkState.data.slice()],
    //     });
    //     break;

    //   default:
    //     break;
    // }

    // setTodoGroupIdState(eLabel.None);
    closeBottomSheetModal(bottomSheetModalRef);
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        index={0}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onDismiss={onDismiss}
        backdropComponent={renderBackdrop}>
        <View>
          {/* <Text>{t(todoGroupNames[todoGroupIdState])}</Text> */}
          <BottomSheetTextInput
            style={styles.textInput}
            autoFocus={true}
            value={text}
            onChangeText={onChangeText}
            onSubmitEditing={onPressCompleted}
          />
          <DefaultButton
            id="todo-item-complete"
            text={t('완료')}
            onPress={onPressCompleted}
          />
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

export default CreateTodoBottomSheet;
