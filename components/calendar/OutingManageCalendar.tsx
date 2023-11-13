import {
  CalendarProvider,
  DateData,
  ExpandableCalendar,
  CalendarList,
  WeekCalendar,
} from 'react-native-calendars';
import {Positions} from 'react-native-calendars/src/expandableCalendar';
import CalendarHeader from '../../etc/HeaderCalendar';
import {useRecoilState} from 'recoil';
import {selectedDateAtom} from '../../states';

const OutingManageCalenadr = () => {
  /** useRecoilState */
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);

  const onDayPress = ({dateString}: DateData) => {
    setSelectedDate(dateString);
  };

  return (
    // <CalendarList
    //   horizontal={true}
    //   pagingEnabled={true}
    //   renderHeader={() => <CalendarHeader />}
    //   onDayPress={onDayPress}
    //   hideExtraDays={false}
    // />
    // <CalendarProvider date={selectedDate}>
    //   <ExpandableCalendar
    //     disablePan={true}
    //     initialPosition={Positions.OPEN}
    //     hideArrows={true}
    //     renderArrow={() => null}
    //     onDayPress={onDayPress}
    //     onCalendarToggled={() => console.log('제발?')}
    //   />
    // </CalendarProvider>

    <WeekCalendar firstDay={1} />
  );
};

export default OutingManageCalenadr;
