import {Text, View} from 'react-native';
import DefaultButton from '../button/defaultButton';

interface IOutingTimeSettingSection {
  states: {time: string; hour: string; minute: string};
  onPressed: {
    Time: (id: string) => void;
    Hour: (id: string) => void;
    Minute: (id: string) => void;
  };
}

const OutingTimeSettingSection = ({
  states,
  onPressed,
}: IOutingTimeSettingSection) => {
  const timeSettingInfo = {
    timeInfo: {
      title: '오전/오후',
      state: states.time,
      values: ['오전', '오후'],
      onPress: onPressed.Time,
    },
    hourInfo: {
      title: '시',
      state: states.hour,
      values: Array.from(new Array(12), (_, i) => (i + 1).toString()),
      onPress: onPressed.Hour,
    },
    minuteInfo: {
      title: '분',
      state: states.minute,
      values: Array.from(new Array(12), (_, i) => (i * 5).toString()),
      onPress: onPressed.Minute,
    },
  };

  const {timeInfo, hourInfo, minuteInfo} = timeSettingInfo;

  return (
    <View>
      {[timeInfo, hourInfo, minuteInfo].map(
        ({title, values, state, onPress}, key) => (
          <View key={key} className="flex-row">
            <Text>{title}</Text>
            <View className="flex-row">
              {values.map(text => (
                <DefaultButton
                  key={text}
                  selectedId={state}
                  id={text}
                  text={text}
                  onPress={onPress}
                />
              ))}
            </View>
          </View>
        ),
      )}
    </View>
  );
};

export default OutingTimeSettingSection;
