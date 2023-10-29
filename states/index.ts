import {atom} from 'recoil';
import {ITimeParams, ITodoItems} from '../types/interface';
import {getCalendarDate, initFullTime} from '../constants';

const appintmentTimeAtom = atom<ITimeParams>({
  key: 'appintmentTimeAtom',
  default: initFullTime,
});

const todoBeforeOutingAtom = atom<ITodoItems[]>({
  key: 'todoBeforeOutingAtom',
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
  appintmentTimeAtom,
  todoBeforeOutingAtom,
  outingReadyAtom,
  selectedDateAtom,
};
