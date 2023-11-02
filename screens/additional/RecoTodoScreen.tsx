import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import DefaultButton from '../../components/button/defaultButton';
import {todoItemList} from '../../constants';
import {useSetRecoilState} from 'recoil';
import {recoTodoAtom} from '../../states';

const RecoTodoScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useSetRecoilState */
  const setRecoTodoAtom = useSetRecoilState(recoTodoAtom);

  /** useState */
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onPressListItem = (key: string) => {
    if (selectedIds.includes(key as never)) {
      const newSelectedIds = selectedIds.filter(
        selectedId => selectedId !== key,
      );

      setSelectedIds(newSelectedIds);
    } else {
      const sliceSelectedIds = selectedIds.slice();
      sliceSelectedIds.push(key);

      setSelectedIds(sliceSelectedIds);
    }
  };

  const onCompleted = () => {
    const recoTodoList = selectedIds.map(id => todoItemList[id]);
    setRecoTodoAtom(recoTodoList);

    navigation.pop();
  };

  return (
    <SafeAreaView className="h-full">
      <Text>{t('외출 전 할 일을 모두 골라주세요:)')}</Text>
      <View>
        {todoItemList.map((text, key) => (
          <TouchableOpacity
            key={key}
            className="flex-row"
            onPress={() => onPressListItem(key.toString())}>
            <Text>{t(`${text}`)}</Text>
            {selectedIds.includes(key.toString() as never) && (
              <OcticonsIcon name="check-circle-fill" size={15} color="black" />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <DefaultButton
        id="bottom-button"
        text={t('선택 완료')}
        onPress={onCompleted}
      />
    </SafeAreaView>
  );
};

export default RecoTodoScreen;
