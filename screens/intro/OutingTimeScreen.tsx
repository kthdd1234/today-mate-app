import {Button, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type TProps = NativeStackScreenProps<
  {TodoSettingScreen: undefined},
  'TodoSettingScreen'
>;

const OutingTimeScreen = ({navigation}: TProps) => {
  const onPress = () => {
    navigation.navigate('TodoSettingScreen');
  };

  return (
    <View>
      <Button title="다음" onPress={onPress} />
    </View>
  );
};

export default OutingTimeScreen;
