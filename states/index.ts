import {atom} from 'recoil';
import {ITimeValues} from '../types/interface';

const timeSettingValuesAtom = atom<ITimeValues>({
  key: 'timeSettingValuesAtom',
  default: {
    time: '',
    hour: '',
    miniute: '',
  },
});

export {timeSettingValuesAtom};
