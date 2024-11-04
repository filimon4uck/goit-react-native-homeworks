import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../styles/global";
import React from "react";

type btnPrimProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  buttonStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
};

const ButtonPrimary: React.FC<btnPrimProps> = ({
  children,
  onPress,
  buttonStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.primaryButton, buttonStyle]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.orange,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
  },
});
