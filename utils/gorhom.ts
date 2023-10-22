import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Ref} from 'react';

const openBottomSheetModal = (ref: Ref<BottomSheetModal> | null) =>
  ref?.current.present();

const closeBottomSheetModal = (ref: Ref<BottomSheetModal> | null) =>
  ref?.current.close();

export {openBottomSheetModal, closeBottomSheetModal};
