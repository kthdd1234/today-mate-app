import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, View} from 'react-native';

type TProps = NativeStackScreenProps<
  {TodoMainScreen: undefined},
  'TodoMainScreen'
>;

const TodoSettingScreen = ({navigation}: TProps) => {
  const onPress = () => {
    // navigation.reset({routes: [{name: 'TodoMainScreen'}]});
  };

  return (
    <View>
      <Button title="다음" onPress={onPress} />
    </View>
  );
};

export default TodoSettingScreen;
