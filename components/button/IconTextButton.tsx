import {Text, TouchableOpacity, View} from 'react-native';

interface IProps {
  /** */
  icon: JSX.Element;
  /** */
  text: string;
  /** */
  onPress: () => void;
}

const IconTextButton = ({icon, text, onPress}: IProps) => {
  return (
    <TouchableOpacity className="flex-row" onPress={onPress}>
      <View className="mr-1">{icon}</View>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default IconTextButton;
