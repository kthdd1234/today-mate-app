import {SafeAreaView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useQuery} from '@realm/react';
import {Item} from '../../schema/ItemSchema';
import {getAmpmHHmm, getDay} from '../../constants';
import {useTranslation} from 'react-i18next';
import {FAB} from '@rneui/themed';
import {useState} from 'react';

const HomeScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  const [visible, setVisible] = useState(true);

  /** realm */
  const items = useQuery(Item);

  console.log(items[0]);

  const onPressItem = () => {
    //
  };

  const onPressFloatingAction = () => {
    navigation.navigate('FirstScreen');
  };

  return (
    <SafeAreaView className="h-full">
      <View>
        <Text className="text-3xl">홈</Text>
      </View>
      <View>
        {items.map(item => (
          <TouchableOpacity key={item._id} onPress={onPressItem}>
            <View className="flex-row">
              <Text>{item.destination}</Text>
              <FeatherIcons name="more-vertical" />
            </View>
            <Text>{getAmpmHHmm(item.appointmentTime)}</Text>
            <View className="flex-row">
              {item.notificationIds.map(info => (
                <Text key={info._id}>{t(getDay(info.date))}</Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <FAB
        placement="right"
        visible={visible}
        icon={{name: 'add', color: 'white'}}
        color="blue"
        onPress={onPressFloatingAction}
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
