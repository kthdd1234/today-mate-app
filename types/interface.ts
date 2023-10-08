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
}

export interface ITodoSettingState {
  groupId: string;
  groupName: string;
  itemId: string;
  itemName: string;
}
