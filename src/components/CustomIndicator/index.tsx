import React from 'react';
import {ActivityIndicator, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';

type indicatorSize = 'small' | 'large';

interface ICustomIndicator {
  size: indicatorSize;
  style?: ViewStyle;
  color?: string;
  animating?: boolean;
}

export const CustomIndicator: React.FC<ICustomIndicator> = ({
  size,
  style = {},
  color,
  animating,
}) => {
  return (
    <ActivityIndicator
      size={size}
      style={style}
      color={color || colors.primaryAppColor}
      {...(animating && {animating})}
    />
  );
};
