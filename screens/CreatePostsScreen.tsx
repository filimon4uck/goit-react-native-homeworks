import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Text, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { colors, commonStyles, textStyles } from "../styles/global";
import CameraIcon from "../assets/icons/camera.svg";
import ButtonSecondary from "../components/ButtonSecondary";
import InputCreate from "../components/InputCreate";
import MapPin from "../assets/icons/map-pin.svg";
import ButtonPrimary from "../components/ButtonPrimary";

const CreatePostsScreen = () => {
  const [query, setQuery] = useState({ title: "", location: "" });
  const onChangeHandler = (field: string, text: string) => {
    setQuery((prevState) => ({ ...prevState, [field]: text }));
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
            <View style={styles.addImage}>
              <View style={styles.cameraContainer}>
                <CameraIcon fill={colors.border_gray} width={24} height={24} />
              </View>
            </View>
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
              <MapPin />
            </InputCreate>
          </View>

          <ButtonPrimary isActive={false} buttonStyle={styles.publishButton}>
            <Text style={styles.publishButtonText}>Опублікувати</Text>
          </ButtonPrimary>
        </View>
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
    minHeight: 267,
  },
  addImage: {
    width: "100%",
    height: "34%",
    minHeight: 240,
    borderRadius: 8,
    backgroundColor: colors.gray,
    borderWidth: 1,
    borderColor: colors.border_gray,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  addButton: {
    ...textStyles.mediumText,
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
});
