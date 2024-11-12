import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Text, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import * as Location from "expo-location";
import { colors, commonStyles, textStyles } from "../styles/global";
import ButtonSecondary from "../components/ButtonSecondary";
import InputCreate from "../components/InputCreate";
import MapPin from "../assets/icons/map-pin.svg";
import ButtonPrimary from "../components/ButtonPrimary";
import DeleteIcon from "../assets/icons/trash.svg";
import Camera from "../components/Camera";
import { useNavigation } from "@react-navigation/native";

const CreatePostsScreen = () => {
  const [query, setQuery] = useState({ title: "", location: "" });
  const onChangeHandler = (field: string, text: string) => {
    setQuery((prevState) => ({ ...prevState, [field]: text }));
  };
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();

  const OnButtonPress = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    navigation.navigate("Posts");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.addImageContainer}>
          <View style={styles.imageBtnWrapper}>
            <Camera />
            <ButtonSecondary>
              <Text style={styles.addButton}>Завантажте фото</Text>
            </ButtonSecondary>
          </View>

          <View style={styles.inputsContainer}>
            <InputCreate
              outerStyles={[styles.inputCreate]}
              value={query.title}
              field="title"
              onChangeText={onChangeHandler}
              placeholder="Назва..."
            />
            <InputCreate
              outerStyles={styles.inputCreate}
              outerStylesText={styles.regularText}
              value={query.location}
              field="location"
              onChangeText={onChangeHandler}
              placeholder="Місцевість..."
            >
              <MapPin stroke={colors.dark_gray} />
            </InputCreate>
          </View>

          <ButtonPrimary
            onPress={OnButtonPress}
            isActive={true}
            buttonStyle={styles.publishButton}
          >
            <Text style={styles.publishButtonText}>Опублікувати</Text>
          </ButtonPrimary>
        </View>
        <ButtonSecondary outerStyles={styles.deleteBtn}>
          <DeleteIcon />
        </ButtonSecondary>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,

    backgroundColor: colors.white,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  addImageContainer: {
    width: "100%",
    gap: 32,
    justifyContent: "flex-start",
  },
  imageBtnWrapper: {
    gap: 8,
    height: "50%",
    minHeight: 314,
  },
  addButton: {
    ...textStyles.regularText,
    color: colors.dark_gray,
  },
  inputsContainer: {
    gap: 16,
  },
  inputCreate: {
    borderBottomWidth: 1,
  },
  publishButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  publishButtonText: {},
  regularText: {
    fontFamily: "Roboto-Regular",
  },
  deleteBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 22,
  },
});
