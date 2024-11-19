import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../styles/global";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../store/authSlice/selectors";
type userProps = {
  outerStyles?: StyleProp<ViewStyle>;
};

const User: React.FC<userProps> = ({ outerStyles }) => {
  const userInfo = useSelector(selectUserInfo);
  return (
    <View style={[styles.userContainer, outerStyles]}>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.image}
          source={{ uri: userInfo?.photoURL }}
        ></ImageBackground>
      </View>
      <View style={styles.nameEmailWrapper}>
        <Text style={styles.nameText}>{userInfo?.displayName}</Text>
        <Text style={styles.email}>{userInfo?.email}</Text>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  imageContainer: {
    width: 60,
    height: 60,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 16,
    overflow: "hidden",
  },
  nameEmailWrapper: {},
  nameText: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 16,
    color: colors.black,
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: colors.black_80,
  },
});
