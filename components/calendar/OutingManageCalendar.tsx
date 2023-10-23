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

  const onDayPress = ({dateString}: DateData) => {
    setSelectedDate(dateString);
  };

  console.log(selectedDate);

  return (
    <CalendarProvider date={selectedDate}>
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
