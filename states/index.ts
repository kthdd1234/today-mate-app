import {atom} from 'recoil';
import {IOutingTimeValues, ITodoItems} from '../types/interface';
import {getCalendarDate, initOutingTimeValues} from '../constants';

const outingTimeValuesAtom = atom<IOutingTimeValues>({
  key: 'outingTimeValuesAtom',
  default: initOutingTimeValues,
});

const todoBeforeOutingAtom = atom<ITodoItems[]>({
  key: 'todoBeforeOutingAtom',
  default: [],
});

const beforeOutingMinuteAtom = atom<string>({
  key: 'beforeOutingMinuteAtom',
  default: '',
});

const selectedDateAtom = atom({
  key: 'selectedDateAtom',
  default: getCalendarDate(),
});

export {
  initOutingTimeValues,
  outingTimeValuesAtom,
  todoBeforeOutingAtom,
  beforeOutingMinuteAtom,
  selectedDateAtom,
};
