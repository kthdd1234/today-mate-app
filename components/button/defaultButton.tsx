import {TouchableOpacity, Text} from 'react-native';
import {IDefaultButton} from '../../types/interface';

const DefaultButton = ({id, isEnable, text, onPress}: IDefaultButton) => {
  return (
    <TouchableOpacity className="mx-1" onPress={() => onPress(id)}>
      <Text className={`${isEnable && 'text-red-500'}`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
