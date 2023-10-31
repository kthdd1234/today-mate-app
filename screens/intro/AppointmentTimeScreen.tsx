import {useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {openBottomSheetModal} from '../../utils/gorhom';
import {appointmentTimeItemList} from '../../constants';
import OnBoarding from '../../components/onboarding/OnBoarding';
import TimeSettingBottomSheet from '../../components/bottomSheet/TimeSettingBottomSheet';
import {ITimeParams} from '../../types/interface';
import {useSetRecoilState} from 'recoil';
import {appintmentTimeAtom} from '../../states';

const AppointmentTimeScreen = ({navigation}) => {
  /** lastIndex */
  const lastIndex = appointmentTimeItemList.length - 1;

  /** useSetRecoilState */
  const setAppintmentTime = useSetRecoilState(appintmentTimeAtom);

  /** useState */
  const [ItemList, setItemList] = useState(appointmentTimeItemList);
  const [selectedId, setSelectedId] = useState<string>('');

  /** useRef */
  const ref = useRef<BottomSheetModal>(null);

  const onNext = ({ampm, hour, minute}: ITimeParams) => {
    setAppintmentTime({ampm, hour, minute});
    navigation.navigate('DestinationTimeScreen');
  };

  const onPressListItem = (id: string) => {
    if (id === lastIndex.toString()) {
      openBottomSheetModal(ref);
    } else {
      const item = appointmentTimeItemList[id];
      const {ampm, hour, minute} = item;

      setSelectedId(id);
      onNext({ampm, hour, minute});
    }
  };

  const onCompletedBottomSheet = ({ampm, hour, minute}: ITimeParams) => {
    ItemList[lastIndex].text = `⚙️ ${ampm} ${hour}:${minute}`;

    setItemList([...ItemList]);
    setSelectedId(lastIndex.toString());
    onNext({ampm, hour, minute});
  };

  return (
    <OnBoarding
      step={1}
      title="몇시까지 가야해요?"
      list={ItemList.map(item => item.text)}
      selectedIds={[selectedId]}
      onPressListItem={onPressListItem}
      bottomSheetModal={
        <TimeSettingBottomSheet
          targetRef={ref}
          isAmpm={true}
          onPressCompleted={onCompletedBottomSheet}
        />
      }
    />
  );
};

export default AppointmentTimeScreen;
// {['ko', 'en'].map(value => (
//   <Button
//     key={value}
//     title={value}
//     onPress={() => i18n.changeLanguage(value)}
//   />
// ))}
//  ${t(`${time}`)} ${hour}:${minute}
