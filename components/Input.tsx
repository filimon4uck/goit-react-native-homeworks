import {
  TextInput,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../styles/global";

type InputProps = {
  placeholder?: string;
  outerStyles?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  value: string;
  field: "email" | "password" | "login";
  onChangeText: (field: string, text: string) => void;
  secureTextEntry?: boolean;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  outerStyles,
  children,
  onChangeText,
  value,
  field,
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const onFocusHandler = () => {
    setIsFocused(true);
  };
  const onBlurHandler = () => {
    setIsFocused(false);
  };
  return (
    <View style={[styles.input, outerStyles, isFocused && styles.focused]}>
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(field, text)}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        value={value}
        secureTextEntry={secureTextEntry}
      />
      {children}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.gray,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: colors.black,
    flex: 1,
  },
  focused: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
  },
});
