import {atom} from 'recoil';
import {ITimeParams, IDefaultItem} from '../types/interface';
import {getCalendarDate, initFullTime} from '../constants';

const destinationAtom = atom<IDefaultItem>({
  key: 'destinationAtom',
  default: {
    id: '',
    text: '',
  },
});

const appintmentTimeAtom = atom<ITimeParams>({
  key: 'appintmentTimeAtom',
  default: initFullTime,
});

const destinationTimeAtom = atom<string>({
  key: 'destinationTimeAtom',
  default: '',
});

const todoAtom = atom<IDefaultItem[]>({
  key: 'todoAtom',
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

export {
  destinationAtom,
  appintmentTimeAtom,
  destinationTimeAtom,
  todoAtom,
  outingReadyAtom,
  selectedDateAtom,
};
