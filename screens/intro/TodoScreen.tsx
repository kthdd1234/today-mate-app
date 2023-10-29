import {useTranslation} from 'react-i18next';
import {useSetRecoilState} from 'recoil';
import {todoItems} from '../../constants';
import {todoBeforeOutingAtom} from '../../states';
import {useState} from 'react';
import {ITodoItems} from '../../types/interface';

const TodoScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilState */
  const setTodoBeforeOuting = useSetRecoilState(todoBeforeOutingAtom);

  /** useState */
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onPressItem = (id: string) => {
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

  const onPressNext = () => {
    const resultItems = selectedIds.map(id =>
      todoItems.find(item => item.id === id),
    );

    setTodoBeforeOuting(resultItems as ITodoItems[]);
    navigation.navigate('OutingReadyScreen');
  };

  return (
    // <SafeAreaView className="h-full">
    //   <Stepper pos={1} />
    //   <SelectItemsSection
    //     title="외출 전에 할 일을 골라봐요:)"
    //     renderList={todoItems}
    //     selectedIds={selectedIds}
    //     onPress={onPressItem}
    //   />
    //   <DefaultButton id="next-btn" text={t('다음')} onPress={onPressNext} />
    // </SafeAreaView>
    <OnBoarding
      step={0}
      title=""
      list={ItemList}
      selectedIds={[selectedId]}
      onPressListItem={onPressListItem}
      bottomSheetModal={
        <TimeSettingBottomSheet
          ref={ref}
          isAmpm={true}
          onPressCompleted={onCompletedBottomSheet}
        />
      }
    />
  );
};

export default TodoScreen;
