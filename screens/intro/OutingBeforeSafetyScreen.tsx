import {View} from 'react-native';
import SelectItemsSection from '../../components/section/SelectItemsSection';
import DefaultButton from '../../components/button/defaultButton';
import {useTranslation} from 'react-i18next';
import {safetyInspectionItems} from '../../constants';
import {safetySelectedIdsAtom} from '../../states';
import {useRecoilState} from 'recoil';
import Stepper from '../../components/step/stepper';

const OutingBeforeSafetyScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilState */
  const [safetySelectedIds, setSafetySelectedIds] = useRecoilState(
    safetySelectedIdsAtom,
  );

  const onPressNext = () => {
    navigation.navigate('OutingBeforeTakingScreen');
  };

  const onPressItem = (id: string) => {
    if (safetySelectedIds.includes(id as never)) {
      const newSelectedIds = safetySelectedIds.filter(
        selectedId => selectedId !== id,
      );
      setSafetySelectedIds(newSelectedIds);
    } else {
      const sliceSelectedIds = safetySelectedIds.slice();
      sliceSelectedIds.push(id);

      setSafetySelectedIds(sliceSelectedIds);
    }
  };

  return (
    <View className="h-full">
      <Stepper pos={1} />
      <SelectItemsSection
        title="외출 전에,\n안전 점검을 해볼까요?"
        renderList={safetyInspectionItems}
        selectedIds={safetySelectedIds}
        onPress={onPressItem}
      />
      <DefaultButton id="next-btn" text={t('다음')} onPress={onPressNext} />
    </View>
  );
};

export default OutingBeforeSafetyScreen;
