/* eslint-disable react-hooks/exhaustive-deps */
import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useQuery} from '@realm/react';
import {Item} from '../../schema/ItemSchema';
import {useTranslation} from 'react-i18next';
import {FAB} from '@rneui/themed';
import {useSetRecoilState} from 'recoil';
import {isFeedbackAtom} from '../../states';
import ItemListSection from '../../components/section/ItemListSection';

const HomeScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useSetRecoilState */
  const setIsFeedback = useSetRecoilState(isFeedbackAtom);

  /** realm */
  const itemData = useQuery(Item);
  const itemList = itemData.map(item => item);

  const onPressFloatingAction = () => {
    navigation.navigate('FirstScreen');
  };

  const onPressFeedback = () => {
    if (Keyboard.isVisible()) {
      setIsFeedback(true);
    }
  };

  const onPress = () => {};

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={onPressFeedback}>
        <View className="h-full p-5 ">
          <Text className="mb-3 text-3xl font-bold">약속</Text>
          <ItemListSection itemList={itemList} />
          <FAB
            placement="right"
            visible={true}
            icon={{name: 'add', color: 'white'}}
            color="blue"
            onPress={onPressFloatingAction}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default HomeScreen;
/**
 * 약속 장소
 * 약속 시간
 * 걸리는 시간
 * 일찍 도착
 * 외출 준비
 */
