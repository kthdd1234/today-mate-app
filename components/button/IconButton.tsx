import {TouchableOpacity} from 'react-native-gesture-handler';

interface IProps {
  /** */
  className?: string;
  /** */
  icon: JSX.Element;
  /** */
  onPress: () => void;
}

const IconButton = ({className, icon, onPress}: IProps) => {
  return (
    <TouchableOpacity className={className} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default IconButton;
