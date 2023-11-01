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
  bottomSheet: JSX.Element;
  /** */
  onPress: (id: string) => void;
}

const ChipSection = ({
  title,
  chips,
  selectedIds,
  bottomSheet,
  onPress,
}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  return (
    <View>
      <Text>{t(`${title}`)}</Text>
      <View>
        {chips.map((value, key) => (
          <Chip
            key={key}
            selected={selectedIds.includes(key.toString() as never)}
            onPress={() => onPress(key.toString())}>
            {value}
          </Chip>
        ))}
      </View>
      {bottomSheet}
    </View>
  );
};

export default ChipSection;
