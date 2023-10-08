import {atom} from 'recoil';
import {ITimeValues} from '../types/interface';
import {initOutingTime, outingBeforeCheckList} from '../constants';
import {eTodoGroupIds} from '../types/enum';

const outingTimeSettingValuesAtom = atom<ITimeValues>({
  key: 'timeSettingValuesAtom',
  default: initOutingTime,
});

const isAlarmOutingTimeAtom = atom<boolean>({
  key: 'isAlarmOutingTimeAtom',
  default: false,
});

const outingBeforeCheckListAtom = atom({
  key: 'outingBeforeCheckListAtom',
  default: outingBeforeCheckList,
});

const todoItemAtom = atom({
  key: 'todoItemAtom',
  default: {
    groupId: eTodoGroupIds.None,
    itemId: '',
    itemName: '',
  },
});

export {
  initOutingTime,
  outingTimeSettingValuesAtom,
  isAlarmOutingTimeAtom,
  outingBeforeCheckListAtom,
  todoItemAtom,
};
