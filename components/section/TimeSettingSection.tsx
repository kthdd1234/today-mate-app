import {Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {timeSettingValuesAtom} from '../../states';
import DefaultButton from '../button/defaultButton';

const TimeSettingSection = () => {
  /** useRecoilState */
  const [timeSettingValues, setTimeSettingValues] = useRecoilState(
    timeSettingValuesAtom,
  );

  const {time, hour, miniute} = timeSettingValues;

  const onPressTime = (id: string) => {
    setTimeSettingValues({...timeSettingValues, time: id});
  };

  const onPressHour = (id: string) => {
    setTimeSettingValues({...timeSettingValues, hour: id});
  };

  const onPressMiniute = (id: string) => {
    setTimeSettingValues({...timeSettingValues, miniute: id});
  };

  const timeSettingInfo = {
    timeInfo: {
      title: '오전/오후',
      state: time,
      values: ['오전', '오후'],
      onPress: onPressTime,
    },
    hourInfo: {
      title: '시',
      state: hour,
      values: Array.from(new Array(12), (_, i) => (i + 1).toString()),
      onPress: onPressHour,
    },
    minuteInfo: {
      title: '분',
      state: miniute,
      values: Array.from(new Array(12), (_, i) => (i * 5).toString()),
      onPress: onPressMiniute,
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

export default TimeSettingSection;
