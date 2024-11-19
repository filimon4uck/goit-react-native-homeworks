import {
  TextInput,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import React, { useState } from "react";
import { colors, textStyles } from "../styles/global";

type InputProps = {
  placeholder?: string;
  outerStyles?: StyleProp<ViewStyle>;
  outerStylesText?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  value: string;
  field: string;
  onChangeText: (field: string, text: string) => void;
  secureTextEntry?: boolean;
};

const InputCreate: React.FC<InputProps> = ({
  placeholder,
  outerStyles,
  outerStylesText,
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
      {children}
      <TextInput
        style={[styles.text, outerStylesText]}
        placeholder={placeholder}
        placeholderTextColor={colors.dark_gray}
        onChangeText={(text) => onChangeText(field, text)}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default InputCreate;

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: colors.border_gray,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  text: {
    ...textStyles.regularText,
    color: colors.black,
    flex: 1,
  },
  focused: {},
});
