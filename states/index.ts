import {atom} from 'recoil';
import {ITimeValues} from '../types/interface';
import {initOutingTime} from '../constants';
import {eTodoGroupIds} from '../types/enum';

const outingTimeSettingValuesAtom = atom<ITimeValues>({
  key: 'outingTimeSettingValuesAtom',
  default: initOutingTime,
});

const safetySelectedIdsAtom = atom({
  key: 'safetySelectedIdsAtom',
  default: [''],
});

const takingSelectedIdsAtom = atom({
  key: 'takingSelectedIdsAtom',
  default: [''],
});

const todoSelectedIdsAtom = atom({
  key: 'todoSelectedIdsAtom',
  default: [''],
});

const isAlarmOutingTimeAtom = atom<boolean>({
  key: 'isAlarmOutingTimeAtom',
  default: false,
});

const todoGroupIdAtom = atom({
  key: 'todoGroupIdAtom',
  default: eTodoGroupIds.None,
});

export {
  initOutingTime,
  outingTimeSettingValuesAtom,
  isAlarmOutingTimeAtom,
  safetySelectedIdsAtom,
  takingSelectedIdsAtom,
  todoSelectedIdsAtom,
  todoGroupIdAtom,
};
