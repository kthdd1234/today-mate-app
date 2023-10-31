import {useSetRecoilState} from 'recoil';
import {destinationItemList, getUniqueId} from '../../constants';
import {destinationAtom} from '../../states';
import {useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {openBottomSheetModal} from '../../utils/gorhom';
import {IDefaultItem} from '../../types/interface';
import OnBoarding from '../../components/onboarding/OnBoarding';
import CreateItemBottomSheet from '../../components/bottomSheet/CreateItemBottomSheet';

const DestinationScreen = ({navigation}) => {
  /** lastIndex */
  const lastIndex = destinationItemList.length - 1;

  /** useSetRecoilState */
  const setDestinationAtom = useSetRecoilState(destinationAtom);

  /** useState */
  const [ItemList, setItemList] = useState(destinationItemList);
  const [selectedId, setSelectedId] = useState<string>('');

  /** useRef */
  const ref = useRef<BottomSheetModal>(null);

  const onNext = (item: IDefaultItem) => {
    setDestinationAtom({...item});
    navigation.navigate('AppointmentTimeScreen');
  };

  const onPressListItem = (id: string) => {
    if (id === lastIndex.toString()) {
      openBottomSheetModal(ref);
    } else {
      const item = destinationItemList[id];
      const uid = getUniqueId(0);

      setSelectedId(id);
      onNext({id: uid, text: item.text});
    }
  };

  const onCompletedBottomSheet = ({id, text}: IDefaultItem) => {
    ItemList[lastIndex] = text;

    setItemList([...ItemList]);
    onNext({id, text});
  };

  return (
    <OnBoarding
      step={0}
      title="목적지가 어디에요?"
      list={destinationItemList}
      selectedIds={[selectedId]}
      onPressListItem={onPressListItem}
      bottomSheetModal={
        <CreateItemBottomSheet
          targetRef={ref}
          onCompleted={onCompletedBottomSheet}
        />
      }
    />
  );
};

export default DestinationScreen;
