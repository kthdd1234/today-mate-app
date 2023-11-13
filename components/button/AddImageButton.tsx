import {Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddImageButton = () => {
  return (
    <TouchableOpacity className="items-center justify-center w-full border border-gray-400 border-dashed rounded-md h-36">
      <Ionicons name="add" size={20} />
      <Text>사진 추가</Text>
    </TouchableOpacity>
  );
};

export default AddImageButton;
