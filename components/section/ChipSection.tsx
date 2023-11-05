import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {Chip} from 'react-native-paper';

interface IProps {
  /** */
  title: string;
  /** */
  chips: string[];
  /** */
  selectedIds: string[];
  /** */
  onPress: (id: string) => void;
}

const ChipSection = ({title, chips, selectedIds, onPress}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  return (
    <View>
      <Text>{t(`${title}`)}</Text>
      <View className="flex-row flex-wrap gap-2 ">
        {chips.map((value, key) => (
          <Chip
            className="whitespace-pre-wrap"
            mode="outlined"
            key={key}
            selected={selectedIds.includes(key.toString() as never)}
            onPress={() => onPress(key.toString())}>
            {value}
          </Chip>
        ))}
      </View>
    </View>
  );
};

export default ChipSection;
