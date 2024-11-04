import { TouchableOpacity } from "react-native";
import React from "react";

type buttonProps = {
  children: React.ReactNode;
  onButtonPress: () => void;
  isPressed?: boolean;
};
const ButtonSecondary: React.FC<buttonProps> = ({
  children,
  onButtonPress,
}) => {
  return (
    <TouchableOpacity onPress={onButtonPress}>{children}</TouchableOpacity>
  );
};

export default ButtonSecondary;
