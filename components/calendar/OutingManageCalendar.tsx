import {
  CalendarProvider,
  DateData,
  ExpandableCalendar,
} from 'react-native-calendars';
import {Positions} from 'react-native-calendars/src/expandableCalendar';
import CalendarHeader from '../header/calendarHeader';
import {useRecoilState} from 'recoil';
import {selectedDateAtom} from '../../states';

const OutingManageCalenadr = () => {
  /** useRecoilState */
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);

  const onDayPress = ({year, month, day}: DateData) => {
    setSelectedDate({year, month, day});
  };

  return (
    <CalendarProvider date={'2023-10-21'} showTodayButton>
      <ExpandableCalendar
        disablePan={true}
        initialPosition={Positions.OPEN}
        renderHeader={() => <CalendarHeader />}
        renderArrow={() => ''}
        onDayPress={onDayPress}
      />
    </CalendarProvider>
  );
};

export default OutingManageCalenadr;
