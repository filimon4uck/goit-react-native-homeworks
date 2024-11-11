import { StyleSheet } from "react-native";

export const colors = {
  white: "#FFFFFF",
  black: "#212121",
  black_80: "rgba(33, 33, 33, 0.8)",
  border_gray: "#E8E8E8",
  gray: "#F6F6F6",
  blue: "#1B4371",
  orange: "#FF6C00",
  dark_gray: "#BDBDBD",
  black_03: "rgba(0, 0, 0, 0.3)",
};

export const textStyles = StyleSheet.create({
  mediumText: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: 1,
  },
  regularText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  titleHeaderText: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
});
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
