import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IconTextButton from '../button/IconButton';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Input} from 'react-native-elements';
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

interface IProps {
  /** */
  todoList: string[];
  /** */
  isShowInput: boolean;
  /** */
  inputText: string;
  /** */
  onPressAddTodo: () => void;
  /** */
  onPressRecoList: () => void;
  /** */
  onChangeText: (text: string) => void;
  /** */
  onPressRemoveItem: (index: number) => void;
  /** */
  onSubmitEditing: () => void;
  /** */
  onDragEnd: (params: DragEndParams<string>) => void;
}

const AddTodoSection = ({
  todoList,
  inputText,
  isShowInput,
  onPressAddTodo,
  onPressRecoList,
  onChangeText,
  onPressRemoveItem,
  onSubmitEditing,
  onDragEnd,
}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  const renderItem = ({
    getIndex,
    item,
    drag,
    isActive,
  }: RenderItemParams<string>) => {
    const index = getIndex() || 0;

    return (
      <ScaleDecorator>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
          <View className="flex-row justify-between">
            <View className="flex-row">
              <MaterialIcons
                name="remove-circle"
                onPress={() => onPressRemoveItem(index)}
              />
              <Text>{index + 1}</Text>
              <Text>{item}</Text>
            </View>
            <FontAwesomeIcon name="bars" />
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View>
      <View className="flex-row justify-between">
        <View>
          <Text>{t('외출 준비 리스트를 작성해볼까요?')}</Text>
        </View>
        <View className="flex-row ">
          <IconTextButton
            icon={<EntypoIcon name="star" />}
            text={t('추천 리스트')}
            onPress={onPressRecoList}
          />
        </View>
      </View>
      <View>
        <View>
          {isShowInput ? (
            <Input
              blurOnSubmit={false}
              enterKeyHint="done"
              autoFocus={true}
              placeholder={t('ex. 썬크림 바르기, 향수 뿌리기')}
              value={inputText}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
            />
          ) : (
            <IconTextButton
              icon={<EntypoIcon name="plus" />}
              text={t('외출 준비')}
              onPress={onPressAddTodo}
            />
          )}

          <View>
            <DraggableFlatList
              data={todoList}
              onDragEnd={onDragEnd}
              keyExtractor={(item, key) => key.toString()}
              renderItem={renderItem}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddTodoSection;
// 🔌 휴대폰 충전기 챙기기
//({data}) => console.log(data)
// 할 일이 생각 안날 땐 추천 목록에서 찾아보세요!
