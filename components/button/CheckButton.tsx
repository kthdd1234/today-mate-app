import {useState} from 'react';
import IconButton from './IconButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IParamsChecked} from '../../types/interface';

interface IProps {
  /** */
  initState: boolean;
  /** */
  id: string;
  /** */
  onChecked: ({id, newValue}: IParamsChecked) => void;
}

const CheckButton = ({id, onChecked}: IProps) => {
  /** useState */
  const [isChecked, setIsChecked] = useState(false);

  const onPress = () => {
    setIsChecked(!isChecked);
    onChecked({id, newValue: !isChecked});
  };

  return (
    <IconButton
      className={isChecked ? '진한색' : '텅빈색'}
      icon={
        <MaterialCommunityIcons
          name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        />
      }
      onPress={onPress}
    />
  );
};

export default CheckButton;
