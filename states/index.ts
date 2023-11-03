import {atom} from 'recoil';
import {ITimeParams, IDefaultItem} from '../types/interface';
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

const earlyStartAtom = atom<string>({
  key: 'earlyStartAtom',
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

const recoTodoAtom = atom<string[]>({
  key: 'recoTodoAtom',
  default: [],
});

export {
  destinationAtom,
  appintmentTimeAtom,
  destinationTimeAtom,
  todoAtom,
  outingReadyAtom,
  selectedDateAtom,
  earlyStartAtom,
  recoTodoAtom,
};
