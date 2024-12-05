/**
 * This file is created, to have same Touchable
 * component across the app.
 *
 * For now, we are showing TouchableOpacity for all plaform
 * because for ripple of TouchableNativeFeedback to Work
 * properly, it need to be wrapped in a view, twice it's with & height (for complete ripple)
 */
import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

interface ITouchReceptor extends TouchableOpacityProps {
  disableBlurEffect?: boolean;
  children: React.ReactNode;
  activeOpacity?: number;
}

const TouchReceptor: React.FC<ITouchReceptor> = ({
  /**
   *  @True if blur effect not required for touch, default value is False
   */
  disableBlurEffect,
  /**
   *  main content of the view
   */
  children,
  activeOpacity = 0.2,
  ...rest
}) => {
  return (
    // 1 means no effect on click
    <TouchableOpacity
      activeOpacity={disableBlurEffect ? 1 : activeOpacity}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchReceptor;
