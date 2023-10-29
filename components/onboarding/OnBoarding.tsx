import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import DefaultButton from '../button/defaultButton';
import OcticonsIcon from 'react-native-vector-icons/Octicons';

interface IProps {
  step: number;
  title: string;
  list: {[key: string]: string}[];
  selectedIds: string[];
  bottomButtonText?: string;
  isShowBottomButton?: boolean;
  bottomSheetModal?: JSX.Element;
  onPressListItem: (id: string) => void;
  onPressBottomButton?: () => void;
}

const OnBoarding = ({
  step,
  title,
  list,
  selectedIds,
  bottomButtonText,
  isShowBottomButton,
  bottomSheetModal,
  onPressListItem,
  onPressBottomButton,
}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  return (
    <SafeAreaView className="f-full">
      <View>{step}</View>
      <View>
        <Text>{t(`${title}`)}</Text>
        <View>
          {list.map(({id, text, emoji}) => (
            <TouchableOpacity
              key={id}
              className="flex-row"
              onPress={() => onPressListItem(id)}>
              <Text>{emoji}</Text>
              <Text>{t(`${text}`)}</Text>
              {selectedIds.includes(id as never) && (
                <OcticonsIcon
                  name="check-circle-fill"
                  size={15}
                  color="black"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        {isShowBottomButton && (
          <DefaultButton
            id="bottom-button"
            text={t(bottomButtonText ?? '')}
            onPress={() => onPressBottomButton}
          />
        )}
        {bottomSheetModal ?? false}
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;
