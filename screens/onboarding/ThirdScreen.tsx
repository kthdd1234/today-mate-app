import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Stepper from '../../components/step/stepper';
import DefaultButton from '../../components/button/defaultButton';
import {useTranslation} from 'react-i18next';
import ChipSection from '../../components/section/ChipSection';
import TimeSettingBottomSheet from '../../components/bottomSheet/TimeSettingBottomSheet';
import {
  convertTimeToMinute,
  getTimeFormatString,
  getUniqueId,
  outingReadyItemList,
} from '../../constants';
import {outingReadyAtom, recoTodoAtom, todoAtom} from '../../states';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useEffect, useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {openBottomSheetModal} from '../../utils/gorhom';
import {ITimeParams} from '../../types/interface';
import AddTodoSection from '../../components/section/AddTodoSection';
import {DragEndParams} from 'react-native-draggable-flatlist';

const ThirdScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** lastIndex */
  const outingReadyLastIndex = outingReadyItemList.length - 1;

  /** useRecoilValue  */
  const recoTodoList = useRecoilValue(recoTodoAtom);

  /** useSetRecoilState */
  const setOutingReadyAtom = useSetRecoilState(outingReadyAtom);
  const setTodoAtom = useSetRecoilState(todoAtom);

  /** useState */
  const [outingReadyState, setOutingReadyState] = useState(outingReadyItemList);
  const [outingReadyId, setOutingReadyId] = useState('');
  const [isShowInput, setIsShowInput] = useState(false);
  const [inputText, setInputText] = useState('');
  const [todoList, setTodoList] = useState<string[]>([]);

  /** useRef */
  const outingReadyRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const newTodoList = [...todoList, ...recoTodoList];
    setTodoList(newTodoList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recoTodoList]);

  const onNext = () => {
    if (outingReadyId !== '') {
      const outingReadyItem = outingReadyState[outingReadyId];
      const newTodoList = todoList.map((text, key) => ({
        id: getUniqueId(key),
        text: text,
      }));

      setTodoAtom(newTodoList);
      setOutingReadyAtom(outingReadyItem.minute);

      navigation.navigate('FourScreen');
    }
  };

  const onPressOutingReadyItem = (id: string) => {
    id === outingReadyLastIndex.toString()
      ? openBottomSheetModal(outingReadyRef)
      : setOutingReadyId(id);
  };

  const onCompletedOutingReadyBottomSheet = ({hour, minute}: ITimeParams) => {
    const [Hour, Minute] = [Number(hour), Number(minute)];
    const timeText = getTimeFormatString({
      hour: Hour,
      minute: Minute,
    });

    outingReadyState[outingReadyLastIndex].text = timeText;
    outingReadyState[outingReadyLastIndex].minute = convertTimeToMinute({
      hour: Hour,
      minute: Minute,
    });

    setOutingReadyState([...outingReadyState]);
    setOutingReadyId(`${outingReadyLastIndex}`);
  };

  const onPressAddTodo = () => {
    setIsShowInput(true);
  };

  const onPressRecoList = () => {
    navigation.navigate('RecoTodoScreen');
  };

  const onPressFeedback = () => {
    if (isShowInput) {
      if (inputText !== '') {
        setTodoList([inputText, ...todoList]);
        setInputText('');
      }

      setIsShowInput(false);
      Keyboard.dismiss();
    }
  };

  const onChangeText = (text: string) => {
    setInputText(text);
  };

  const onPressRemoveItem = (index: number) => {
    todoList.splice(index, 1);

    setTodoList([...todoList]);
  };

  const onSubmitEditing = () => {
    setTodoList([inputText, ...todoList]);
    setInputText('');
  };

  const onDragEnd = ({data}: DragEndParams<string>) => {
    setTodoList(data);
  };

  return (
    <SafeAreaView className="h-full">
      <TouchableWithoutFeedback onPress={onPressFeedback}>
        <View className="h-full">
          <Stepper step={3} />
          <AddTodoSection
            todoList={todoList}
            inputText={inputText}
            isShowInput={isShowInput}
            onPressAddTodo={onPressAddTodo}
            onPressRecoList={onPressRecoList}
            onChangeText={onChangeText}
            onPressRemoveItem={onPressRemoveItem}
            onSubmitEditing={onSubmitEditing}
            onDragEnd={onDragEnd}
          />
          <ChipSection
            title="외출 준비는 보통 얼마나 걸려요?"
            chips={outingReadyState.map(state => state.text)}
            selectedIds={[outingReadyId]}
            onPress={onPressOutingReadyItem}
          />

          <DefaultButton id="next-btn" text={t('다음')} onPress={onNext} />
          <TimeSettingBottomSheet
            targetRef={outingReadyRef}
            isAmpm={false}
            onPressCompleted={onCompletedOutingReadyBottomSheet}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ThirdScreen;
