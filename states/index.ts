import {atom} from 'recoil';
import {ITimeParams} from '../types/interface';
import {getCalendarDate, initFullTime} from '../constants';

const destinationAtom = atom<string>({
  key: 'destinationAtom',
  default: '',
});

const appintmentTimeAtom = atom<ITimeParams>({
  key: 'appintmentTimeAtom',
  default: initFullTime,
});

const destinationTimeAtom = atom<string>({
  key: 'destinationTimeAtom',
  default: '',
});

const earlyArrivalAtom = atom<string>({
  key: 'earlyArrivalAtom',
  default: '',
});

const goalsAtom = atom<string[]>({
  key: 'goalsAtom',
  default: [],
});

const outingReadyAtom = atom<string>({
  key: 'outingReadyAtom',
  default: '',
});

const selectedDateAtom = atom({
  key: 'selectedDateAtom',
  default: getCalendarDate(),
});

const isFeedbackAtom = atom({
  key: 'isFeedbackAtom',
  default: false,
});

export {
  destinationAtom,
  appintmentTimeAtom,
  destinationTimeAtom,
  goalsAtom,
  outingReadyAtom,
  selectedDateAtom,
  earlyArrivalAtom,
  isFeedbackAtom,
};
