import {SafeAreaView, Text, View} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useQuery} from '@realm/react';
import {Item} from '../../schema/ItemSchema';
import {getTimeFormatStr, setHourMinuteStr} from '../../constants';

const HomeScreen = () => {
  /** realm */
  const items = useQuery(Item);

  const onPress = () => {
    //
  };

  return (
    <SafeAreaView className="h-full">
      <View>
        <Text className="text-3xl">홈</Text>
      </View>
      <View>
        <TouchableOpacity onPress={onPress}>
          <View className="flex-row">
            <Text>회사</Text>
            <FeatherIcons name="more-vertical" />
          </View>
          <Text>오전 9시 30분 외출</Text>
          <Text>월 화 수 목 금</Text>
        </TouchableOpacity>
      </View>

      <FloatingAction
        actions={[]}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
/**
 * 약속 장소
 * 약속 시간
 * 걸리는 시간
 * 일찍 도착
 * 외출 준비
 */
