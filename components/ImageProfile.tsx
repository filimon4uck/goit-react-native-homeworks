import { View, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { colors } from "../styles/global";
import Plus from "../assets/icons/Union.svg";
type imageProfileProps = {
  loadedImage: boolean;
};

const ImageProfile: React.FC<imageProfileProps> = ({ loadedImage }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/images/user_image.png")}
      ></ImageBackground>
      <View
        style={[
          styles.addIcon,
          {
            borderColor: loadedImage ? colors.border_gray : colors.orange,
            backgroundColor: colors.white,
          },
        ]}
      >
        <Plus
          fill={loadedImage ? colors.border_gray : colors.orange}
          width={13}
          height={13}
          rotation={loadedImage ? 45 : 0}
        />
      </View>
    </View>
  );
};

export default ImageProfile;

const styles = StyleSheet.create({
  container: {
    top: -60,
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: colors.gray,
    borderRadius: 16,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  addIcon: {
    position: "absolute",
    bottom: 14,
    left: 107,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1,
  },
});
