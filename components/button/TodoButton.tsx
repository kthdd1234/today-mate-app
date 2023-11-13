import {Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IProps {
  /** */
  id: string;
  /** */
  name: string;
  /** */
  onPress: (id: string) => void;
}

const TodoButton = ({id, name, onPress}: IProps) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between w-full"
      onPress={() => onPress(id)}>
      <Text>{name}</Text>
      <MaterialIcons name="more-horiz" size={10} />
    </TouchableOpacity>
  );
};

export default TodoButton;
