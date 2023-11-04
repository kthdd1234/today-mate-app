import {SafeAreaView, Text} from 'react-native';
import DefaultButton from '../../components/button/DefaultButton';
import {useTranslation} from 'react-i18next';

const StartScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  const onPressStart = () => {
    navigation.navigate('FirstScreen');
  };

  return (
    <SafeAreaView>
      <Text>반가워요! 지금부터</Text>
      <Text>약속 장소에 일찍 도착하는</Text>
      <Text>습관을 만들어볼까요?</Text>
      <DefaultButton id="start" text="시작하기" onPress={onPressStart} />
    </SafeAreaView>
  );
};

export default StartScreen;

/**
 * 외추리
 * 반가워요! 지금부터
 * 외출 준비를 시작 해볼까요?
 * 아웃팅와 함께 외출 준비를 차근차근 해보아요.
 */
