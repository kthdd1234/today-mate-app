import {Text, TouchableOpacity} from 'react-native';

const MemoButton = () => {
  return (
    <TouchableOpacity>
      <Text>메모 할 내용이 있다면 입력해보세요.</Text>
      <Text>
        할 일 체크, 사진 추가, 메모 입력 시 다음 날이 되었을 때 오늘 항목 바로
        아래에 히스토리 추가(제일 상단은 오늘, 다음 하단에 어제 날짜부터 과거로
        히스토리 나열)
      </Text>
    </TouchableOpacity>
  );
};

export default MemoButton;
