import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Ref} from 'react';

export interface IDefaultButton {
  id: string;
  text: string;
  selectedId?: string;
  onPress: (id: string) => void;
}

export interface ITimeSettingSection {
  initTime: ITimeValues;
}

export interface ITimeValues {
  time: string;
  hour: string;
  minute: string;
}

export interface IPropsBottomSheet {
  bottomSheetModalRef: Ref<BottomSheetModal> | null;
  onPressCompleted: ({time, hour, minute}: ITimeValues) => void;
}

export interface ITodoSettingState {
  groupId: string;
  groupName: string;
  itemId: string;
  itemName: string;
}

export interface ISelectItemsSection {
  title: string;
  selectedIds: string[];
  renderList: {id: string; text: string; emoji: string}[];
  onPress: (id: string) => void;
}

export interface ISetRealmTask {
  task: string;
}

export interface ISetRealmOuting {
  isAlarm: boolean;
}

export interface ISetRealmUser {
  isAlarm: boolean;
}

export interface IStringToDate {
  year: number;
  month: number;
  day: number;
  time: string;
  hour: string;
  minute: string;
}

export interface IGetBeforeOutingTime {
  date: Date;
  minute: number;
}
