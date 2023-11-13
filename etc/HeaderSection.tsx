import {Text, View} from 'react-native';
import IconButton from '../components/button/IconButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRecoilValue} from 'recoil';
import {selectedDateAtom} from '../states';
import moment from 'moment';
import {getLng} from '../constants';

const HeaderSection = () => {
  return (
    <View className="flex-row">
      <Text className="text-2xl">약속</Text>
    </View>
  );
};

export default HeaderSection;
// /** useRecoilValue */
// const selectedDate = useRecoilValue(selectedDateAtom);

// /** moment */
// const formatDate = moment(selectedDate).format(
//   {
//     ko: 'YYYY년 MM월',
//     en: 'MM, YYYY',
//   }[getLng()],
// );
{
  /* <IconButton
icon={<Ionicons name="calendar-outline" size={30} />}
onPress={onPressCalendar}
/>
<IconButton
icon={<Ionicons name="list-circle-outline" size={30} />}
onPress={onPressList}
/> */
}
