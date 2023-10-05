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

export interface ITimeSettingBottomSheet {
  bottomSheetModalRef: Ref<BottomSheetModal> | null;
}
