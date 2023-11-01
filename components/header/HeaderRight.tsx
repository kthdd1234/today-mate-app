import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const HeaderRight = () => {
  const onPress = () => {
    //
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesignIcons name="setting" size={22} />
    </TouchableOpacity>
  );
};

export default HeaderRight;
