import {
  CalendarProvider,
  DateData,
  ExpandableCalendar,
  WeekCalendar,
} from 'react-native-calendars';
import {useRecoilState} from 'recoil';
import {selectedDateAtom} from '../states';
import {Positions} from 'react-native-calendars/src/expandableCalendar';

const CalendarSection = () => {
  /** useRecoilState */
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);

  const onPressDay = ({dateString}: DateData) => {
    setSelectedDate(dateString);
  };

  return (
    <CalendarProvider date={selectedDate}>
      <WeekCalendar firstDay={1} />

      {/* <ExpandableCalendar
        disablePan={true}
        initialPosition={Positions.CLOSED}
        hideArrows={true}
        renderArrow={() => null}
        onDayPress={onPressDay}
      /> */}
    </CalendarProvider>
  );
};

export default CalendarSection;
