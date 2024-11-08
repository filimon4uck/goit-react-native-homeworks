import {
  Alert,
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors, textStyles } from "../styles/global";
import React, { useState } from "react";
import Input from "../components/Input";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import ImageProfile from "../components/ImageProfile";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const RegistrationScreen: React.FC = () => {
  const [query, setQuery] = useState({ login: "", email: "", password: "" });
  const [isVisiblePassw, setIsVisiblePassw] = useState(true);

  const onLoginHandler = () => {
    Alert.alert("Login");
  };
  const onRegisterHandler = () => {
    Alert.alert("Register");
  };
  const onChangeHandler = (field: string, text: string) => {
    setQuery((prevState) => ({ ...prevState, [field]: text }));
  };
  const onPressButtonHandler = () => {
    setIsVisiblePassw((prev) => !prev);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/PhotoBG.png")}
          style={styles.image}
          resizeMode="cover"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "padding"}
          style={styles.formContainer}
        >
          <ImageProfile loadedImage={true} />
          <Text style={styles.title}>Реєстрація</Text>
          <View style={[, styles.innerContainer, styles.inputsContainer]}>
            <Input
              placeholder="Логін"
              onChangeText={onChangeHandler}
              value={query.login}
              field="login"
            />
            <Input
              placeholder="Адреса електронної пошти"
              onChangeText={onChangeHandler}
              value={query.email}
              field="email"
            />

            <Input
              placeholder="Пароль"
              value={query.password}
              onChangeText={onChangeHandler}
              outerStyles={styles.showPasswordButton}
              secureTextEntry={isVisiblePassw}
              field="password"
            >
              <ButtonSecondary onButtonPress={onPressButtonHandler}>
                <Text style={[styles.baseButtonText, styles.secondaryButton]}>
                  Показати
                </Text>
              </ButtonSecondary>
            </Input>
          </View>
          <View style={[styles.innerContainer, styles.buttonsContainer]}>
            <ButtonPrimary isActive={true} onPress={onRegisterHandler}>
              <Text style={(styles.baseButtonText, styles.primaryButton)}>
                Зареєстуватися
              </Text>
            </ButtonPrimary>
            <View style={styles.registerContainer}>
              <Text style={[styles.baseButtonText, styles.secondaryButton]}>
                Вже є акаунт?
              </Text>
              <ButtonSecondary onButtonPress={onLoginHandler}>
                <Text style={[styles.baseButtonText, styles.secondaryButton]}>
                  Увійти
                </Text>
              </ButtonSecondary>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    resizeMode: "cover",
  },
  formContainer: {
    position: "relative",
    paddingHorizontal: 16,
    paddingTop: 92,
    width: SCREEN_WIDTH,
    height: "68%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: "center",
  },
  title: {
    ...textStyles.mediumText,
    textAlign: "center",
    color: colors.black,
  },
  innerContainer: {
    gap: 16,
  },

  inputsContainer: {
    marginTop: 32,
    width: "100%",
  },
  buttonsContainer: {
    marginTop: 42,
    width: "100%",
  },
  baseButtonText: {
    ...textStyles.regularText,
  },
  secondaryButton: {
    color: colors.blue,
  },
  primaryButton: {
    color: colors.white,
    textAlign: "center",
  },
  showPasswordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
