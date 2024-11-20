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
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Input from "../components/Input";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import { stackParamList } from "../navigation/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { login } from "../utils/auth";
import { useDispatch } from "react-redux";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

export type LoginScreenProps = StackScreenProps<stackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation<LoginScreenProps["navigation"]>();
  const [query, setQuery] = useState({ email: "", password: "" });
  const [isVisiblePassw, setIsVisiblePassw] = useState(true);
  // if i want to clear fields when login is unfocused
  // useEffect(() => {
  //   navigation.addListener("blur", clearFields);
  // }, [navigation]);
  // const clearFields = () => {
  //   setQuery({ email: "", password: "" });
  // };
  const dispatch = useDispatch();
  const onLoginHandler = async () => {
    try {
      await login(query, dispatch);
    } catch (error) {
      console.log("Error login", error);
    }
  };
  const onRegisterHandler = () => {
    navigation.navigate("Register");
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
          behavior={Platform.OS === "android" ? undefined : "padding"}
          style={styles.formContainer}
        >
          <Text style={styles.title}>Увійти</Text>
          <View style={[, styles.innerContainer, styles.inputsContainer]}>
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
            <ButtonPrimary
              onPress={onLoginHandler}
              isActive={
                query.email.trim() !== "" && query.password.trim() !== ""
              }
            >
              <Text style={(styles.baseButtonText, styles.primaryButton)}>
                Увійти
              </Text>
            </ButtonPrimary>
            <View style={styles.registerContainer}>
              <Text style={[styles.baseButtonText, styles.secondaryButton]}>
                Немає акаунту?
              </Text>
              <ButtonSecondary onButtonPress={onRegisterHandler}>
                <Text
                  style={[
                    styles.baseButtonText,
                    styles.secondaryButton,
                    { textDecorationLine: "underline" },
                  ]}
                >
                  Зареєструватися
                </Text>
              </ButtonSecondary>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
    paddingHorizontal: 16,
    paddingTop: 32,
    width: SCREEN_WIDTH,
    height: "62%",
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
  baseButtonText: { ...textStyles.regularText },
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
