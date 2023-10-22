import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Ref} from 'react';
import {RepeatFrequency} from '@notifee/react-native';

export interface IDefaultButton {
  id: string;
  text: string;
  selectedId?: string;
  onPress: (id: string) => void;
}

export interface ITimeSettingSection {
  initTime: IOutingTimeValues;
}

export interface IOutingTimeValues {
  ampm: string;
  hour: string;
  minute: string;
}

export interface IPropsBottomSheet {
  bottomSheetModalRef: Ref<BottomSheetModal> | null;
  onPressCompleted: ({ampm, hour, minute}: IOutingTimeValues) => void;
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

export interface ISetRealmOuting {
  isNotify: boolean;
  outingTimeNotifiId: string | null;
  beforeOutingTimeNotifiId: string | null;
}

export interface IMomentFormatter {
  year: string;
  month: string;
  day: string;
  ampm: string;
  hour: string;
  minute: string;
}

export interface IGetBeforeOutingTime {
  formatString: string;
  minute: number;
}

export interface ITriggerNotification {
  title: string;
  body: string;
  dateTime: string;
  repeat: RepeatFrequency;
  categoryId: 'outing' | 'task';
}

export interface ITaskInfo {
  id: string;
  outingId: string;
  taskNotifiId: string;
  label: string;
  emoji: string;
  name: string;
  isChecked: boolean;
}

export interface ITodoItems {
  id: string;
  text: string;
  emoji: string;
}
