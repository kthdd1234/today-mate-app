import {Text, View} from 'react-native';
import {Bar} from 'react-native-progress';

interface IProps {
  /** */
  step: 0 | 1 | 2 | 3;
}

const ProgressBar = ({step}: IProps) => {
  const barInfo = [
    {progress: 0.3, cur: 1},
    {progress: 0.6, cur: 2},
    {progress: 1.0, cur: 3},
  ];

  return (
    <View className="flex-row items-center">
      <Bar
        className="mr-1"
        width={200}
        progress={barInfo[step].progress}
        borderColor="white"
        unfilledColor="#EDEFF0"
        borderRadius={100}
      />
      <Text className="text-xs text-gray-400">
        {barInfo[step].cur}/{barInfo.length}
      </Text>
    </View>
  );
};

export default ProgressBar;
