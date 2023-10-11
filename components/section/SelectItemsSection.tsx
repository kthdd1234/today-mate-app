import {useTranslation} from 'react-i18next';
import {Text, View, TouchableOpacity} from 'react-native';
import {ISelectItemsSection} from '../../types/interface';
import OcticonsIcon from 'react-native-vector-icons/Octicons';

const SelectItemsSection = ({
  title,
  renderList,
  selectedIds,
  onPress,
}: ISelectItemsSection) => {
  /** useTranslation */
  const {t} = useTranslation();

  return (
    <View>
      <Text>{t(`${title}`)}</Text>
      <View>
        {renderList.map(({id, text, emoji}) => (
          <TouchableOpacity
            className="flex-row"
            key={id}
            onPress={() => onPress(id)}>
            <Text>{emoji}</Text>
            <Text>{t(`${text}`)}</Text>
            {selectedIds.includes(id as never) && (
              <OcticonsIcon name="check-circle-fill" size={15} color="black" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SelectItemsSection;
