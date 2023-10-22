import {atom} from 'recoil';
import {IOutingTimeValues, ITodoItems} from '../types/interface';
import {initOutingTimeValues} from '../constants';

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
  default: {
    year: 0,
    month: 0,
    day: 0,
  },
});

export {
  initOutingTimeValues,
  outingTimeValuesAtom,
  todoBeforeOutingAtom,
  beforeOutingMinuteAtom,
  selectedDateAtom,
};
