import {Text, View} from 'react-native';
import DefaultButton from '../../components/button/defaultButton';

const IntroStartScreen = ({navigation}) => {
  const onPressStart = () => {
    navigation.navigate('OutingTimeSettingScreen');
  };

  return (
    <View>
      <Text>반가워요! 지금부터</Text>
      <Text>외출 준비를 해볼까요?</Text>
      <Text>차근차근 오늘의 외출 준비를 해보아요.</Text>
      <DefaultButton id="start" text="시작하기" onPress={onPressStart} />
    </View>
  );
};

export default IntroStartScreen;

/**
 * 외추리
 * 반가워요! 지금부터
 * 외출 준비를 시작 해볼까요?
 * 아웃팅와 함께 외출 준비를 차근차근 해보아요.
 */
