import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {todoWorkItems} from '../../constants';
import {todoSelectedIdsAtom} from '../../states';
import SelectItemsSection from '../../components/section/SelectItemsSection';
import DefaultButton from '../../components/button/defaultButton';
import Stepper from '../../components/step/stepper';

const OutingBeforeTodoScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilState */
  const [todoSelectedIds, setTodoSelectedIds] =
    useRecoilState(todoSelectedIdsAtom);

  const onPressNext = () => {
    //
    navigation.navigate('AlarmRequestScreen'); //
  };

  const onPressItem = (id: string) => {
    if (todoSelectedIds.includes(id as never)) {
      const newSelectedIds = todoSelectedIds.filter(
        selectedId => selectedId !== id,
      );
      setTodoSelectedIds(newSelectedIds);
    } else {
      const sliceSelectedIds = todoSelectedIds.slice();
      sliceSelectedIds.push(id);

      setTodoSelectedIds(sliceSelectedIds);
    }
  };

  return (
    <View className="h-full">
      <Stepper pos={3} />
      <SelectItemsSection
        title="외출 전에,\n해야 할 일이 있나요?"
        renderList={todoWorkItems}
        selectedIds={todoSelectedIds}
        onPress={onPressItem}
      />
      <DefaultButton id="next-btn" text={t('완료')} onPress={onPressNext} />
    </View>
  );
};

export default OutingBeforeTodoScreen;
