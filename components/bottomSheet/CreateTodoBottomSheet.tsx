import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IPropsBottomSheet} from '../../types/interface';

const CreateTodoBottomSheet = ({bottomSheetModalRef}: IPropsBottomSheet) => {
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

  const onSubmitEditing = () => {
    bottomSheetModalRef!.current?.close();
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
          <Text></Text>
          <BottomSheetTextInput
            style={styles.textInput}
            autoFocus={true}
            value={text}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
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
