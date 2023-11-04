import {TouchableOpacity, Text} from 'react-native';
import {ISelectedButton} from '../../types/interface';

const SelectedButton = ({id, selectedIds, text, onPress}: ISelectedButton) => {
  return (
    <TouchableOpacity className="mx-1" onPress={() => onPress(id)}>
      <Text
        className={`${selectedIds.includes(id as never) && 'text-red-500'}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectedButton;
