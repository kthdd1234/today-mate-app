import {View} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const IconButtonHeader = () => {
  return (
    <View className="flex-row">
      <AntDesignIcons name="calendar" size={22} />
      <View className="ml-3" />
      <AntDesignIcons name="sharealt" size={22} />
    </View>
  );
};

export default IconButtonHeader;
