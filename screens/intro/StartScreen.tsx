import {Text, View} from 'react-native';
import DefaultButton from '../../components/button/defaultButton';

const StartScreen = ({navigation}) => {
  const onPressStart = () => {
    navigation.navigate('OutingTimeSettingScreen');
  };

  return (
    <View>
      <Text>반가워요! 지금부터</Text>
      <Text>외출 준비를 시작 해볼까요?</Text>
      <Text>아웃팅 앱과 함께 외출 준비를 차근차근 해보아요.</Text>
      <DefaultButton id="start" text="시작하기" onPress={onPressStart} />
    </View>
  );
};

export default StartScreen;

/**
 * 외추리
 * 반가워요! 지금부터
 * 외출 준비를 시작 해볼까요?
 * 외추리와 함께 외출 준비를 차근차근 해보아요.
 */
