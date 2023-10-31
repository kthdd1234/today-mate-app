import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import DefaultButton from '../button/defaultButton';
import OcticonsIcon from 'react-native-vector-icons/Octicons';

interface IProps {
  step: number;
  title: string;
  list: string[];
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

  console.log(selectedIds);

  return (
    <SafeAreaView className="h-full">
      <View>
        <Text>{step}</Text>
      </View>
      <View>
        <Text>{t(`${title}`)}</Text>
        <View>
          {list.map((text, key) => (
            <TouchableOpacity
              key={key}
              className="flex-row"
              onPress={() => onPressListItem(key.toString())}>
              <Text>{t(`${text}`)}</Text>
              {selectedIds.includes(key.toString() as never) && (
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
            onPress={onPressBottomButton || (_ => {})}
          />
        )}
      </View>
      {bottomSheetModal ?? false}
    </SafeAreaView>
  );
};

export default OnBoarding;
