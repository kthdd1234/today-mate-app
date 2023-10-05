import {
  FlatList,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {outingBeforeCheckList} from '../../constants';
import DefaultButton from '../../components/button/defaultButton';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useState} from 'react';

const TodoSettingScreen = ({navigation}) => {
  /** useState */
  const [checkedIdList, setCheckedIdList] = useState<string[]>([]);

  const onPressCheckbox = ({id, newValue}: {id: string; newValue: boolean}) => {
    if (newValue) {
      setCheckedIdList([...checkedIdList, id]);
    } else {
      const filter = checkedIdList.filter(elmentId => elmentId !== id);
      setCheckedIdList(filter);
    }
  };

  const onPressAddTodo = () => {
    //
  };

  const onPressCompleted = () => {
    // navigation.reset({routes: [{name: 'TodoMainScreen'}]});
  };

  return (
    <View>
      <Text>외출 전 해야 할 일들은 무엇인가요?</Text>
      <View style={styles.container}>
        {/* <FlatList
          keyExtractor={item => item.id}
          data={outingBeforeTodoList}
          renderItem={({item}) => (
            <View style={styles.item}>
              <BouncyCheckbox
                isChecked={checkedIdList.includes(item.id as never)}
                onPress={checked =>
                  onPressCheckbox({id: item.id, newValue: checked})
                }
              />
              <Text style={styles.title}>{item.todo}</Text>
            </View>
          )}
        /> */}
        <SectionList
          sections={outingBeforeCheckList}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
      <DefaultButton id="add-todo" text="할 일 추가" onPress={onPressAddTodo} />
      <DefaultButton
        id="intro-completed"
        text="완료"
        onPress={onPressCompleted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    height: 300,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 0,
  },
  title: {
    color: 'black',
    fontSize: 13,
  },
});

export default TodoSettingScreen;

/**
 * 안전 점검
 * 물건 챙기기
 * 할 일
 */
