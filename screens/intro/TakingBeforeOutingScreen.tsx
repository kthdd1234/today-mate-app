import {SafeAreaView} from 'react-native';
import {takinkThingItems} from '../../constants';
import {useTranslation} from 'react-i18next';
import {takingSelectedIdsAtom} from '../../states';
import {useRecoilState} from 'recoil';
import SelectItemsSection from '../../components/section/SelectItemsSection';
import DefaultButton from '../../components/button/defaultButton';
import Stepper from '../../components/step/stepper';

const TakingBeforeOutingScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilState */
  const [takingSelectedIds, setTakingSelectedIds] = useRecoilState(
    takingSelectedIdsAtom,
  );

  const onPressNext = () => {
    navigation.navigate('TodoBeforeOutingScreen');
  };

  const onPressItem = (id: string) => {
    if (takingSelectedIds.includes(id as never)) {
      const newSelectedIds = takingSelectedIds.filter(
        selectedId => selectedId !== id,
      );
      setTakingSelectedIds(newSelectedIds);
    } else {
      const sliceSelectedIds = takingSelectedIds.slice();
      sliceSelectedIds.push(id);

      setTakingSelectedIds(sliceSelectedIds);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <Stepper pos={2} />
      <SelectItemsSection
        title="외출 전에,\n챙겨야 할 물건이 있나요?"
        renderList={takinkThingItems}
        selectedIds={takingSelectedIds}
        onPress={onPressItem}
      />
      <DefaultButton id="next-btn" text={t('다음')} onPress={onPressNext} />
    </SafeAreaView>
  );
};

export default TakingBeforeOutingScreen;
