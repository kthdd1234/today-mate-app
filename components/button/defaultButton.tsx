import {TouchableOpacity, Text} from 'react-native';
import {IDefaultButton} from '../../types/interface';

const DefaultButton = ({id, selectedId, text, onPress}: IDefaultButton) => {
  return (
    <TouchableOpacity className="mx-1" onPress={() => onPress(id)}>
      <Text className={`${selectedId === id && 'text-red-500'}`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
