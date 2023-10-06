import {SectionList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {outingBeforeCheckList} from '../../constants';
import DefaultButton from '../../components/button/defaultButton';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CreateTodoBottomSheet from '../../components/bottomSheet/CreateTodoBottomSheet';
import {FloatingAction as FloatingActionButton} from 'react-native-floating-action';

const TodoSettingScreen = ({navigation}) => {
  /** useState */
  const [checkedIdList, setCheckedIdList] = useState<string[]>([]);

  /** useRef */
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onPressCheckbox = ({id, newValue}: {id: string; newValue: boolean}) => {
    if (newValue) {
      setCheckedIdList([...checkedIdList, id]);
    } else {
      const filter = checkedIdList.filter(elmentId => elmentId !== id);
      setCheckedIdList(filter);
    }
  };

  const onPressFloatingAction = () => {
    bottomSheetModalRef.current?.present();
  };

  const onPressCompleted = () => {
    // navigation.reset({routes: [{name: 'TodoMainScreen'}]});
  };

  return (
    <View className="h-full">
      <Text>외출 전 해야 할 일들은 무엇인가요?</Text>
      <View style={styles.container}>
        <SectionList
          sections={outingBeforeCheckList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.item}>
              <BouncyCheckbox
                text={item.name}
                isChecked={checkedIdList.includes(item.id)}
                onPress={isChecked =>
                  onPressCheckbox({id: item.id, newValue: isChecked})
                }
              />
            </View>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
      <View className="absolute bottom-0">
        <DefaultButton
          id="intro-completed"
          text="완료"
          onPress={onPressCompleted}
        />
      </View>
      <FloatingActionButton />
      {/* <FAB icon="plus" style={styles.fab} onPress={onPressFloatingAction} /> */}
      <CreateTodoBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    height: 300,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 0,
  },
  header: {
    fontSize: 20,
    backgroundColor: '#fff',
  },
  title: {
    color: 'black',
    fontSize: 13,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TodoSettingScreen;

/**
 * 안전 점검
 * 물건 챙기기
 * 할 일
 */
