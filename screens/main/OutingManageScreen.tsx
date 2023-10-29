import {SafeAreaView} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';

const OutingManageScreen = () => {
  return (
    <SafeAreaView className="h-full">
      <FloatingAction
        actions={[]}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
        }}
      />
    </SafeAreaView>
  );
};

export default OutingManageScreen;

// 할
