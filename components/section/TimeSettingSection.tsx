import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import SelectedButton from '../button/SelectedButton';

interface ITimeSettingSection {
  states: {ampm?: string; hour: string; minute: string};
  onPressed: {
    Time: (id: string) => void;
    Hour: (id: string) => void;
    Minute: (id: string) => void;
  };
}

const TimeSettingSection = ({states, onPressed}: ITimeSettingSection) => {
  /** useTranslation */
  const {t} = useTranslation();

  const info = {
    ampm: {
      title: t('오전/오후'),
      state: states.ampm,
      values: [t('오전'), t('오후')],
      onPress: onPressed.Time,
    },
    hour: {
      title: t('시'),
      state: states.hour,
      values: Array.from(new Array(12), (_, i) => (i + 1).toString()),
      onPress: onPressed.Hour,
    },
    minute: {
      title: t('분'),
      state: states.minute,
      values: Array.from(new Array(12), (_, i) => (i * 5).toString()),
      onPress: onPressed.Minute,
    },
  };

  !states.ampm && info.hour.values.unshift('0');
  !states.ampm && info.minute.values.shift();

  const ampm = states.ampm ? info.ampm : null;
  const list = [ampm, info.hour, info.minute];

  console.log(list);

  return (
    <View>
      {list.map((item, key) =>
        item !== null ? (
          <View key={key} className="flex-row">
            <Text>{item.title}</Text>
            <View className="flex-row">
              {item.values.map(text => (
                <SelectedButton
                  key={text}
                  id={text}
                  text={text}
                  selectedIds={[item.state || '']}
                  onPress={item.onPress}
                />
              ))}
            </View>
          </View>
        ) : null,
      )}
    </View>
  );
};

export default TimeSettingSection;
