import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/global";
import React from "react";

const User: React.FC = () => {
  return (
    <View style={styles.userContainer}>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/user_image.png")}
        ></ImageBackground>
      </View>
      <View style={styles.nameEmailWrapper}>
        <Text style={styles.nameText}>Natali Romanova</Text>
        <Text style={styles.email}>email@example.com</Text>
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
    borderRadius: 16,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
