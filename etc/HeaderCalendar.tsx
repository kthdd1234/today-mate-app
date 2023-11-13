import React from 'react';
// import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useRecoilState} from 'recoil';
import {selectedDateAtom} from '../states';
import moment from 'moment';
import {getLng} from '../constants';

// const headerLables = [
//   {label: '오늘', type: 'line', color: 'blue'},
//   {label: '선택', type: 'fill', color: 'red'},
//   {label: '완료', type: 'fill', color: 'green'},
//   {label: '예정', type: 'fill', color: 'orange'},
// ];

const CalendarDisplayButton = () => {
  /** useRecoilValue */
  const [selectedDate] = useRecoilState(selectedDateAtom);

  const lng = getLng();
  const formatInfo = {
    ko: 'YYYY년 MM월',
    en: 'MM, YYYY',
  };
  const formatDate = moment(selectedDate).format(formatInfo[lng]);

  return (
    <View>
      <Text className="font-semibold">{formatDate}</Text>
    </View>
  );
};

// const CalendarLabelList = () => {
//   const {t} = useTranslation();

//   return (
//     <View className="flex-row">
//       {headerLables.map(({label, type, color}, key) => (
//         <View key={key} className="flex-row items-center ml-2 ">
//           <FontAwesomeIcon
//             name={type === 'line' ? 'circle-o' : 'circle'}
//             size={10}
//             color={color}
//           />
//           <Text className="ml-1 text-xs text-gray-400">{t(label)}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

const HeaderCalendar = () => {
  return (
    <View className="flex-row justify-between w-full">
      <CalendarDisplayButton />
      {/* <CalendarLabelList /> */}
    </View>
  );
};

export default HeaderCalendar;
