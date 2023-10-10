import {atom} from 'recoil';
import {ITimeValues} from '../types/interface';
import {initOutingBeforeTodo, initOutingTime, initTodoItem} from '../constants';
import {eTodoGroupIds} from '../types/enum';

const outingTimeSettingValuesAtom = atom<ITimeValues>({
  key: 'outingTimeSettingValuesAtom',
  default: initOutingTime,
});

const isAlarmOutingTimeAtom = atom<boolean>({
  key: 'isAlarmOutingTimeAtom',
  default: false,
});

const todoGroupIdAtom = atom({
  key: 'todoGroupIdAtom',
  default: eTodoGroupIds.None,
});

const safetyCheckAtom = atom({
  key: 'safetyCheckAtom',
  default: initOutingBeforeTodo,
});

const takingThingsAtom = atom({
  key: 'takingThingsAtom',
  default: initOutingBeforeTodo,
});

const todoWorkAtom = atom({
  key: 'todoWorkAtom',
  default: initOutingBeforeTodo,
});

export {
  initOutingTime,
  outingTimeSettingValuesAtom,
  isAlarmOutingTimeAtom,
  todoGroupIdAtom,
  safetyCheckAtom,
  takingThingsAtom,
  todoWorkAtom,
};
