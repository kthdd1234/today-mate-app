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
  miniute: string;
}

export interface ITimeSettingBottomSheet {
  initTime: ITimeValues;
  bottomSheetModalRef: Ref<BottomSheetModal> | null;
  onCompleted: () => void;
}
