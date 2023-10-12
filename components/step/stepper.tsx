import StepIndicator from 'react-native-step-indicator';
import {customStyles, stepLabels} from '../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stepper = ({pos}: {pos: number}) => {
  const getStepIndicatorIconConfig = ({
    position,
    stepStatus,
  }: {
    position: number;
    stepStatus: string;
  }) => {
    const iconConfig = {
      name: 'schedule',
      color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
      size: 15,
    };
    const iconNames = {
      0: 'schedule',
      1: 'health-and-safety',
      2: 'work',
      3: 'category',
      4: 'notifications',
    };

    iconConfig.name = iconNames[position];
    return iconConfig;
  };

  const renderStepIndicator = (params: any) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  return (
    <StepIndicator
      customStyles={customStyles}
      labels={stepLabels}
      currentPosition={pos}
      renderStepIndicator={renderStepIndicator}
    />
  );
};

export default Stepper;
