import {useSetRecoilState} from 'recoil';
import {getUniqueId, todoItemList} from '../../constants';
import {todoAtom} from '../../states';
import {useState} from 'react';
import OnBoarding from '../../components/onboarding/OnBoarding';

const TodoScreen = ({navigation}) => {
  /** useRecoilState */
  const setTodo = useSetRecoilState(todoAtom);

  /** useState */
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onNext = () => {
    const itemList = selectedIds.map((selectedId, key) => {
      const text =
        todoItemList.find((_, idx) => idx.toString() === selectedId) || '';

      return {id: getUniqueId(key), text: text};
    });

    setTodo(itemList);
    navigation.navigate('OutingReadyScreen');
  };

  const onPressListItem = (id: string) => {
    if (selectedIds.includes(id as never)) {
      const newSelectedIds = selectedIds.filter(
        selectedId => selectedId !== id,
      );

      setSelectedIds(newSelectedIds);
    } else {
      const sliceSelectedIds = selectedIds.slice();
      sliceSelectedIds.push(id);

      setSelectedIds(sliceSelectedIds);
    }
  };

  return (
    <OnBoarding
      step={3}
      title="외출 전에 할 일을 모두 골라주세요:)"
      list={todoItemList}
      selectedIds={selectedIds}
      bottomButtonText="다음"
      isShowBottomButton={true}
      onPressBottomButton={onNext}
      onPressListItem={onPressListItem}
    />
  );
};

export default TodoScreen;
