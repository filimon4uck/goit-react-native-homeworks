import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";

type buttonProps = {
  children: React.ReactNode;
  onButtonPress?: () => void;
  isPressed?: boolean;
  outerStyles?: StyleProp<ViewStyle>;
};
const ButtonSecondary: React.FC<buttonProps> = ({
  children,
  onButtonPress,
  outerStyles,
}) => {
  return (
    <TouchableOpacity style={outerStyles} onPress={onButtonPress}>
      {children}
    </TouchableOpacity>
  );
};

export default ButtonSecondary;
