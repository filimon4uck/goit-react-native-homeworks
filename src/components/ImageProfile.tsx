import { View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../styles/global";
import Plus from "../assets/icons/Union.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../store/authSlice/selectors";
import ButtonSecondary from "./ButtonSecondary";
import { setUserInfo } from "../store/authSlice/slice";
import { AppDispatch } from "../store/store";
import { updateUserAvatar } from "../utils/firestore";
type imageProfileProps = {
  setLoadedImage?: (state: string) => void | undefined;
};
const ImageProfile: React.FC<imageProfileProps> = ({ setLoadedImage }) => {
  const userInfo = useSelector(selectUserInfo);
  const [urlImage, setUrlImage] = useState<string | undefined>(undefined);

  const dispatch = useDispatch();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      if (setLoadedImage) setLoadedImage(result.assets[0].uri);
      // setUriImage(result.assets[0].uri);
      if (userInfo) {
        const photoUrl = await updateUserAvatar(
          userInfo.uid,
          result.assets[0].uri,
          "userImage"
        );
        setUrlImage(photoUrl);
        dispatch(setUserInfo({ ...userInfo, photoURL: photoUrl }));
      }
    }
  };
  return (
    <ButtonSecondary
      onButtonPress={() => {
        pickImage();
      }}
      outerStyles={styles.container}
    >
      <Image
        style={styles.image}
        source={{
          uri: userInfo?.photoURL,
        }}
      />
      <View
        style={[
          styles.addIcon,
          {
            borderColor: userInfo?.photoURL
              ? colors.border_gray
              : colors.orange,
            backgroundColor: colors.white,
          },
        ]}
      >
        <Plus
          style={{
            transform: [{ rotate: userInfo?.photoURL ? "45deg" : "0deg" }],
          }}
          fill={userInfo?.photoURL ? colors.border_gray : colors.orange}
          width={13}
          height={13}
        />
      </View>
    </ButtonSecondary>
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
    overflow: "hidden",
    borderRadius: 16,
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
