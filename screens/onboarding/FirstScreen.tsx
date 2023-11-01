import {View} from 'react-native';
import Stepper from '../../components/step/stepper';
import ChipSection from '../../components/section/ChipSection';
import DefaultButton from '../../components/button/defaultButton';
import {appointmentTimeItemList, destinationItemList} from '../../constants';
import {appintmentTimeAtom, destinationAtom} from '../../states';
import {useSetRecoilState} from 'recoil';
import {useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {openBottomSheetModal} from '../../utils/gorhom';
import {useTranslation} from 'react-i18next';
import TimeSettingBottomSheet from '../../components/bottomSheet/TimeSettingBottomSheet';
import {IDefaultItem, ITimeParams} from '../../types/interface';
import CreateItemBottomSheet from '../../components/bottomSheet/CreateItemBottomSheet';

const FirstScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** lastIndex */
  const destinationLastIdx = destinationItemList.length - 1;
  const appointmentTimeLastIdx = appointmentTimeItemList.length - 1;

  /** useSetRecoilState */
  const setDestinationAtom = useSetRecoilState(destinationAtom);
  const setAppintmentTimeAtom = useSetRecoilState(appintmentTimeAtom);

  /** useState */
  const [destinationState, setDestinationState] = useState(destinationItemList);
  const [appointmentTimeState, setAppointmentTimeState] = useState(
    appointmentTimeItemList,
  );
  const [destinationId, setDestinationId] = useState('');
  const [appointmentTimeId, setAppointmentTimeId] = useState('');

  /** useRef */
  const destinationRef = useRef<BottomSheetModal>(null);
  const appointmentTimeRef = useRef<BottomSheetModal>(null);

  const onNext = () => {
    if (destinationId !== '' && appointmentTimeId !== '') {
      const destinationItem = destinationItemList[destinationId];
      const {ampm, hour, minute} = appointmentTimeItemList[appointmentTimeId];

      setDestinationAtom(destinationItem);
      setAppintmentTimeAtom({ampm, hour, minute});

      navigation.navigate('SecondScreen');
    }
  };

  const onPressDestinationItem = (id: string) => {
    id === destinationLastIdx.toString()
      ? openBottomSheetModal(destinationRef)
      : setDestinationId(id);
  };

  const onPressAppointmentTimeItem = (id: string) => {
    id === appointmentTimeLastIdx.toString()
      ? openBottomSheetModal(appointmentTimeRef)
      : setAppointmentTimeId(id);
  };

  const onCompletedDestinationBottomSheet = ({id, text}: IDefaultItem) => {
    destinationState[destinationLastIdx] = text;
    id;

    setDestinationState([...destinationState]);
  };

  const onCompletedAppointmentTimeBottomSheet = ({
    ampm,
    hour,
    minute,
  }: ITimeParams) => {
    appointmentTimeState[
      appointmentTimeLastIdx
    ].text = `⚙️ ${ampm} ${hour}:${minute}`;

    setAppointmentTimeState([...appointmentTimeState]);
    setAppointmentTimeId(appointmentTimeLastIdx.toString());
  };

  return (
    <View>
      <Stepper step={1} />
      <ChipSection
        title="목적지가 어디에요?"
        chips={destinationState}
        selectedIds={[destinationId]}
        bottomSheet={
          <CreateItemBottomSheet
            targetRef={destinationRef}
            onCompleted={onCompletedDestinationBottomSheet}
          />
        }
        onPress={onPressDestinationItem}
      />
      <ChipSection
        title="몇시까지 가야해요?"
        chips={appointmentTimeState.map(item => item.text)}
        selectedIds={[appointmentTimeId]}
        bottomSheet={
          <TimeSettingBottomSheet
            targetRef={destinationRef}
            isAmpm={true}
            onPressCompleted={onCompletedAppointmentTimeBottomSheet}
          />
        }
        onPress={onPressAppointmentTimeItem}
      />
      <DefaultButton id="next-btn" text={t('다음')} onPress={onNext} />
    </View>
  );
};

export default FirstScreen;
