import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import DefaultButton from '../button/defaultButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IProps {
  /** */
}

const AddTodoSection = ({}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  const onPressAddTodo = () => {
    //
  };

  return (
    <View>
      <View>
        <View>
          <Text>{t('외출 전 할 일을 추가하고')}</Text>
          <Text>{t('우선 순위를 정해보세요 :)')}</Text>
        </View>
        <View>
          <Text>{t('추천 할 일')}</Text>
        </View>
      </View>
      <View>
        <View>
          <View>
            <MaterialIcons name="remove-circle" />
          </View>
        </View>
        <View>
          <DefaultButton
            id="create-todo"
            text="할 일 추가"
            onPress={onPressAddTodo}
          />
        </View>
      </View>
    </View>
  );
};

export default AddTodoSection;
