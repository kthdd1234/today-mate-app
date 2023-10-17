import {IGetBeforeOutingTime, IMomentFormatter} from '../types/interface';
import moment from 'moment';

const momentFormatter = ({
  year,
  month,
  day,
  ampm,
  hour,
  minute,
}: IMomentFormatter) => {
  const ampmInfo = {
    오전: 'AM',
    오후: 'PM',
    am: 'AM',
    pm: 'PM',
    AM: 'AM',
    PM: 'PM',
  };

  const formatString = `${year}-${month}-${day} ${hour}:${minute} ${ampmInfo[ampm]}`;
  const result = moment(formatString, 'YYYY-MM-DD hh:mm a').format();

  return result;
};

const momentBeforeFormatter = ({
  formatString,
  minute,
}: IGetBeforeOutingTime) => {
  return moment(formatString, 'YYYY-MM-DD hh:mm a')
    .subtract(minute, 'minutes')
    .format();
};

export {momentFormatter, momentBeforeFormatter};
