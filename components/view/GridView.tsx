import {View, StyleSheet} from 'react-native';

interface IProps<T> {
  data: T[];
  renderItem(item: T): JSX.Element;
  col: number;
}

const GridView = <T extends any>({data, renderItem, col = 2}: IProps<T>) => {
  return (
    <View className="mb-3" style={styles.container}>
      {data.map((item, index) => {
        return (
          <View style={{width: 100 / col + '%'}} key={index}>
            {renderItem(item)}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default GridView;
