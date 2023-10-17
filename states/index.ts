import {atom} from 'recoil';
import {ITimeValues} from '../types/interface';
import {initOutingTime} from '../constants';
import {eLabel} from '../types/enum';

const outingTimeSettingValuesAtom = atom<ITimeValues>({
  key: 'outingTimeSettingValuesAtom',
  default: initOutingTime,
});

const safetySelectedIdsAtom = atom<string[]>({
  key: 'safetySelectedIdsAtom',
  default: [],
});

const takingSelectedIdsAtom = atom<string[]>({
  key: 'takingSelectedIdsAtom',
  default: [],
});

const todoSelectedIdsAtom = atom<string[]>({
  key: 'todoSelectedIdsAtom',
  default: [],
});

const isAlarmOutingTimeAtom = atom<boolean>({
  key: 'isAlarmOutingTimeAtom',
  default: false,
});

const todoGroupIdAtom = atom({
  key: 'todoGroupIdAtom',
  default: eLabel.None,
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
