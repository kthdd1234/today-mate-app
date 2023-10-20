import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const CalendarHeader = () => {
  /** useTranslation */
  const {t} = useTranslation();

  const headerLables = [
    {label: '오늘', type: 'line', color: 'blue'},
    {label: '체크', type: 'line', color: 'red'},
    {label: '선택', type: 'fill', color: 'green'},
    {label: '예정', type: 'fill', color: 'orange'},
  ];

  return (
    <View className="flex-row justify-end w-full px-3">
      {headerLables.map(({label, type, color}, key) => (
        <View key={key} className="flex-row items-center ml-2">
          <FontAwesomeIcon
            name={type === 'line' ? 'circle-o' : 'circle'}
            size={10}
            color={color}
          />
          <Text className="ml-1 text-xs">{t(label)}</Text>
        </View>
      ))}
    </View>
  );
};

export default CalendarHeader;
