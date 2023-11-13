import {Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IProps {
  /** */
  color: 'green' | 'purple';
  /** */
  icon: string;
  /** */
  name: string;
}

const colorTypes = {
  green: {
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
  },
};

const TagButton = ({icon, color, name}: IProps) => {
  return (
    <TouchableOpacity
      className={`ml-1 flex-row items-center justify-center px-2 ${colorTypes[color].bg} rounded-md`}>
      <MaterialIcons color={color} name={icon} size={15} />
      <Text className={`ml-1 text-xs font-bold ${colorTypes[color].text}`}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default TagButton;
