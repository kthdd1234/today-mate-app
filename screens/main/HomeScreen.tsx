import {SafeAreaView, Text, View} from 'react-native';
import {useQuery} from '@realm/react';
import {Item} from '../../schema/ItemSchema';
import {useTranslation} from 'react-i18next';
import {FAB} from '@rneui/themed';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AppointmentItem from '../../components/item/AppointmentItem';

const HomeScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** realm */
  const itemList = useQuery(Item);

  const onPressFloatingAction = () => {
    navigation.navigate('FirstScreen');
  };

  return (
    <SafeAreaView className="h-full">
      <View className="p-4 mt-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl">{t('약속')}</Text>
          <View className="flex-row">
            <EvilIcons name="calendar" size={35} />
            <EvilIcons name="chart" size={35} />
          </View>
        </View>
        <View>
          {itemList.map((item, key) => (
            <AppointmentItem key={key} item={item} />
          ))}
        </View>
      </View>

      <FAB
        placement="right"
        visible={true}
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
