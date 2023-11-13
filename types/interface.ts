import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Ref} from 'react';
import {RepeatFrequency} from '@notifee/react-native';

export interface IDefaultButton {
  id: string;
  text: string;
  isEnable: boolean;
  onPress: (id: string) => void;
}

export interface ITimeSettingSection {
  initTime: ITimeParams;
}

export interface ITimeParams {
  ampm?: string;
  hour: string;
  minute: string;
}

export interface ITimeSettingBottomSheet {
  targetRef: Ref<BottomSheetModal> | null;
  isAmpm: boolean;
  onPressCompleted: ({ampm, hour, minute}: ITimeParams) => void;
}

export interface ICreateItemBottomSheet {
  initState: string;
  targetRef: Ref<BottomSheetModal> | null;
  onCompleted: ({id, text}: IDefaultItem) => void;
}

export interface INotificationBottomSheet {
  initState: INotificationRepeatState;
  targetRef: Ref<BottomSheetModal> | null;
  onCompleted: ({repeatType, days}: INotificationRepeatState) => void;
}

export interface INotificationRepeatState {
  notificationTime?: string;
  repeatType: string;
  days: string[];
}

export interface IDefaultItemSettingState {
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
  subtitle?: string;
  dateTime: Date;
  repeatFrequency: RepeatFrequency;
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

export interface IDefaultItem {
  id: string;
  text: string;
}

export interface ISelectedButton {
  id: string;
  text: string;
  selectedIds: string[];
  onPress: (id: string) => void;
}

export interface INotificationInfo {
  notificationInfo: {id: string; date: string}[];
}

export interface IParamsSetRealm extends INotificationInfo {
  repeatType: string;
}

export interface IParamsChecked {
  id: string;
  newValue: boolean;
}
