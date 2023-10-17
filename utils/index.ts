import {IGetBeforeOutingTime, IStringToDate} from '../types/interface';
import moment from 'moment';

const stringToDate = ({
  year,
  month,
  day,
  time,
  hour,
  minute,
}: IStringToDate) => {
  const ampmSetting = {
    오전: 'AM',
    오후: 'PM',
    am: 'AM',
    pm: 'PM',
    AM: 'AM',
    PM: 'PM',
  };

  return new Date(
    `${month}/${day}/${year} ${hour}:${minute} ${ampmSetting[time]}`,
  );
};

const getBeforeOutingTime = ({date, minute}: IGetBeforeOutingTime) => {
  return moment(date).subtract(minute, 'minutes').toDate();
};

export {stringToDate, getBeforeOutingTime};
