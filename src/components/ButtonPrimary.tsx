import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../styles/global";
import React from "react";

type btnPrimProps = {
  isActive: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  buttonStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
};

const ButtonPrimary: React.FC<btnPrimProps> = ({
  children,
  isActive = true,
  onPress,
  buttonStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.primaryButton,
        buttonStyle,
        isActive && styles.activeButton,
      ]}
      onPress={onPress}
    >
      <Text style={isActive ? styles.activeText : styles.notActiveText}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  primaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: { backgroundColor: colors.orange },
  activeText: { color: colors.white },
  notActiveText: {
    color: colors.dark_gray,
  },
});
