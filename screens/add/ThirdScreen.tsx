import {SafeAreaView, View} from 'react-native';
import DefaultButton from '../../components/button/DefaultButton';
import {useTranslation} from 'react-i18next';
import ChipSection from '../../components/section/ChipSection';
import TimeSettingBottomSheet from '../../components/bottomSheet/TimeSettingBottomSheet';
import {
  convertTimeToMinute,
  getTimeFormatString,
  earlyArrivalItemList,
  goalsItemList,
} from '../../constants';
import {earlyArrivalAtom, goalsAtom} from '../../states';
import {useSetRecoilState} from 'recoil';
import {useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {openBottomSheetModal} from '../../utils/gorhom';
import {IDefaultItem, ITimeParams} from '../../types/interface';
import CreateItemBottomSheet from '../../components/bottomSheet/CreateItemBottomSheet';

const ThirdScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** lastIndex */
  const earlyArrivalLastIndex = earlyArrivalItemList.length - 1;
  const goalsLastIndex = goalsItemList.length - 1;

  /** useSetRecoilState */
  const setearlyArrivalAtom = useSetRecoilState(earlyArrivalAtom);
  const setGoalsAtom = useSetRecoilState(goalsAtom);

  /** useState */
  const [earlyArrivalState, setearlyArrivalState] =
    useState(earlyArrivalItemList);
  const [earlyArrivalId, setearlyArrivalId] = useState('');
  const [goalState, setGolaState] = useState(goalsItemList);
  const [goalId, setGoalId] = useState('');

  /** useRef */
  const earlyArrivalRef = useRef<BottomSheetModal>(null);
  const goalRef = useRef<BottomSheetModal>(null);

  const onNext = () => {
    if (earlyArrivalId !== '') {
      const earlyArrivalItem = earlyArrivalState[earlyArrivalId];
      const goalItem = goalsItemList[goalId];

      setearlyArrivalAtom(earlyArrivalItem.minute);
      setGoalsAtom([goalItem]);

      navigation.navigate('FourScreen');
    }
  };

  const onPressearlyArrivalItem = (id: string) => {
    id === earlyArrivalLastIndex.toString()
      ? openBottomSheetModal(earlyArrivalRef)
      : setearlyArrivalId(id);
  };

  const onPressGoalItem = (id: string) => {
    id === goalsLastIndex.toString()
      ? openBottomSheetModal(goalRef)
      : setGoalId(id);
  };

  const onCompletedearlyArrivalBottomSheet = ({hour, minute}: ITimeParams) => {
    const [Hour, Minute] = [Number(hour), Number(minute)];
    const timeText = getTimeFormatString({
      hour: Hour,
      minute: Minute,
    });

    earlyArrivalState[earlyArrivalLastIndex].text = timeText;
    earlyArrivalState[earlyArrivalLastIndex].minute = convertTimeToMinute({
      hour: Hour,
      minute: Minute,
    });

    setearlyArrivalState([...earlyArrivalState]);
    setearlyArrivalId(`${earlyArrivalLastIndex}`);
  };

  const onCompletedGoalBottomSheet = ({id, text}: IDefaultItem) => {
    goalState[goalsLastIndex] = text;
    id;

    setGolaState([...goalState]);
    setGoalId(goalsLastIndex.toString());
  };

  return (
    <SafeAreaView className="h-full">
      <View className="h-full">
        <ChipSection
          title="일찍 도착하는 습관을 만들어봐요 :)\n최소한 몇분 일찍 도착할까요?"
          chips={earlyArrivalState.map(state => state.text)}
          selectedIds={[earlyArrivalId]}
          onPress={onPressearlyArrivalItem}
        />
        <ChipSection
          title="약속 장소에 일찍 도착 했을 때 \n실천할 한 가지 할 일을 정해보세요!"
          chips={goalState}
          selectedIds={[goalId]}
          onPress={onPressGoalItem}
        />
        <DefaultButton
          id="next-btn"
          text={t('다음')}
          isEnable={false}
          onPress={onNext}
        />
        <TimeSettingBottomSheet
          targetRef={earlyArrivalRef}
          isAmpm={false}
          onPressCompleted={onCompletedearlyArrivalBottomSheet}
        />
        <CreateItemBottomSheet
          initState={goalState[goalsLastIndex]}
          targetRef={goalRef}
          onCompleted={onCompletedGoalBottomSheet}
        />
      </View>
    </SafeAreaView>
  );
};

export default ThirdScreen;

// /** useRecoilValue  */
// const recoTodoList = useRecoilValue(recoTodoAtom);

// useEffect(() => {
//   const newTodoList = [...todoList, ...recoTodoList];
//   setTodoList(newTodoList);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [recoTodoList]);

{
  /* <AddTodoSection
            todoList={todoList}
            inputText={inputText}
            isShowInput={isShowInput}
            onPressAddTodo={onPressAddTodo}
            onPressRecoList={onPressRecoList}
            onChangeText={onChangeText}
            onPressRemoveItem={onPressRemoveItem}
            onSubmitEditing={onSubmitEditing}
            onDragEnd={onDragEnd}
          /> */
}
{
  /* <ChipSection
            title="지각하지 않으려면 일찍 출발하는 것이 좋아요.\n몇분 일찍 출발 할까요?"
            chips={earlyArrivalState.map(state => state.text)}
            selectedIds={[earlyArrivalId]}
            onPress={onPressEarlyArrivalItem}
          /> */
}

// import AddTodoSection from '../../components/section/AddTodoSection';
// import {DragEndParams} from 'react-native-draggable-flatlist';

// const [isShowInput, setIsShowInput] = useState(false);
// const [inputText, setInputText] = useState('');
// const onPressAddTodo = () => {
//   setIsShowInput(true);
// };

// const onPressRecoList = () => {
//   navigation.navigate('RecoTodoScreen');
// };
// const onChangeText = (text: string) => {
//   setInputText(text);
// };

// const onPressRemoveItem = (index: number) => {
//   todoList.splice(index, 1);

//   setTodoList([...todoList]);
// };

// const onSubmitEditing = () => {
//   setTodoList([inputText, ...todoList]);
//   setInputText('');
// };

// const onDragEnd = ({data}: DragEndParams<string>) => {
//   setTodoList(data);
// };
// const onPressFeedback = () => {
//   if (isShowInput) {
//     if (inputText !== '') {
//       setTodoList([inputText, ...todoList]);
//       setInputText('');
//     }

//     setIsShowInput(false);
//     Keyboard.dismiss();
//   }
// };
