import {SafeAreaView, Text} from 'react-native';
import DefaultButton from '../../components/button/defaultButton';
import {useTranslation} from 'react-i18next';

const StartScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  const onPressStart = () => {
    navigation.navigate('DestinationScreen');
  };

  return (
    <SafeAreaView>
      <Text>반가워요! 지금부터</Text>
      <Text>외출 준비를 해볼까요?</Text>
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
