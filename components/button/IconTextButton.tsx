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
    <TouchableOpacity className="flex-row items-center" onPress={onPress}>
      <View className="mr-[0.5px]">{icon}</View>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default IconTextButton;
