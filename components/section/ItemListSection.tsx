import {View} from 'react-native';
import AppointmentItem from '../item/AppointmentItem';
import {Item} from '../../schema/ItemSchema';

interface IProps {
  /** */
  itemList: Item[];
}

const ItemListSection = ({itemList}: IProps) => {
  return (
    <View>
      {itemList.map((item, key) => (
        <AppointmentItem key={key} item={item} />
      ))}
    </View>
  );
};

export default ItemListSection;
