import {atom} from 'recoil';
import {ITimeValues} from '../types/interface';

const initOutingTime = {
  time: '',
  hour: '',
  minute: '',
};

const outingTimeSettingValuesAtom = atom<ITimeValues>({
  key: 'timeSettingValuesAtom',
  default: initOutingTime,
});

const isAlarmOutingTimeAtom = atom<boolean>({
  key: 'isAlarmOutingTimeAtom',
  default: false,
});

export {initOutingTime, outingTimeSettingValuesAtom, isAlarmOutingTimeAtom};
