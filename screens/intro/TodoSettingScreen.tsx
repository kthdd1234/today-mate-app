import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import DefaultButton from '../../components/button/defaultButton';
import {useRef, useState, useEffect} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CreateTodoBottomSheet from '../../components/bottomSheet/CreateTodoBottomSheet';
import {FloatingAction as FloatingActionButton} from 'react-native-floating-action';
import {
  safetyCheckAtom,
  takingThingsAtom,
  todoGroupIdAtom,
  todoWorkAtom,
} from '../../states';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {useTranslation} from 'react-i18next';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {eTodoGroupIds} from '../../types/enum';
import {
  safetyCheckItems,
  takingThingsItems,
  todoWorkItems,
} from '../../constants';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const TodoSettingScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilState */
  const [safetyCheckState, setSafetyCheckState] =
    useRecoilState(safetyCheckAtom);
  const [takingThingsState, setTakingThingsState] =
    useRecoilState(takingThingsAtom);
  const [todoWorkState, setTodoWorkState] = useRecoilState(todoWorkAtom);
  const setTodoGroupIdState = useSetRecoilState(todoGroupIdAtom);

  /** useState */
  const [checkedIdList, setCheckedIdList] = useState<string[]>([]);

  /** useRef */
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  /** useEffect */
  useEffect(() => {
    setSafetyCheckState(safetyCheckItems);
    setTakingThingsState(takingThingsItems);
    setTodoWorkState(todoWorkItems);
  }, [setSafetyCheckState, setTakingThingsState, setTodoWorkState]);

  /** floatingActions */
  const floatingActions = [
    {
      text: t('안전 점검'),
      icon: <MaterialIcon name="health-and-safety" size={21} color="white" />,
      name: eTodoGroupIds.Safety,
      position: 1,
    },
    {
      text: t('물건 챙기기'),
      icon: <FeatherIcon name="shopping-bag" size={21} color="white" />,
      name: eTodoGroupIds.Taking,
      position: 2,
    },
    {
      text: t('할 일'),
      icon: <MaterialIcon name="category" size={21} color="white" />,
      name: eTodoGroupIds.Work,
      position: 3,
    },
  ];

  const onPressChip = ({text}: {text: string}) => {
    if (!checkedIdList.includes(text)) {
      setCheckedIdList([...checkedIdList, text]);
    } else {
      const filterList = checkedIdList.filter(element => element !== text);
      setCheckedIdList(filterList);
    }
  };

  const onPressFloatingActionItem = (name?: string) => {
    if (name) {
      setTodoGroupIdState(eTodoGroupIds[name]);
      bottomSheetModalRef.current?.present();
    }
  };

  const onPressCompleted = () => {
    // navigation.reset({routes: [{name: 'TodoMainScreen'}]});
  };

  return (
    <View className="h-full">
      <Text>{t('외출 전 할 일은 무엇인가요?')}</Text>
      {[safetyCheckState, takingThingsState, todoWorkState].map(
        (state, key1) => (
          <View key={state.title + key1}>
            <Text style={styles.title}>{state.title}</Text>
            <View>
              {state.data.map((text, key2) => (
                <TouchableOpacity
                  key={text + key2}
                  className="flex-row"
                  onPress={() => onPressChip({text: text})}>
                  {checkedIdList.includes(text) && (
                    <AntDesignIcon name="check" size={15} color="#900" />
                  )}
                  <Text>{t(`${text}`)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ),
      )}
      <View className="absolute bottom-10">
        <DefaultButton
          id="intro-completed"
          text={t('완료')}
          onPress={onPressCompleted}
        />
      </View>
      <FloatingActionButton
        actions={floatingActions}
        onPressItem={onPressFloatingActionItem}
      />
      <CreateTodoBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
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
    color: 'red',
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
