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
import Input from "../components/Input";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import { useNavigation } from "@react-navigation/native";
import { register } from "../utils/auth";
import ImageProfile from "../components/ImageProfile";
import { StackScreenProps } from "@react-navigation/stack";
import { stackParamList } from "../navigation/StackNavigator";
import { useDispatch } from "react-redux";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
export type HomeScreenProps = StackScreenProps<stackParamList, "Login">;

const RegistrationScreen: React.FC<HomeScreenProps> = () => {
  const navigator = useNavigation<HomeScreenProps["navigation"]>();
  const [query, setQuery] = useState({ login: "", email: "", password: "" });
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [isVisiblePassw, setIsVisiblePassw] = useState(true);
  const dispatch = useDispatch();
  const onLoginHandler = () => {
    navigator.navigate("Login");
  };
  const onRegisterHandler = () => {
    const { email, password, login } = query;
    register({ email, password, login, photoURL: imageUri }, dispatch);
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
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.formContainer}
        >
          <ImageProfile setLoadedImage={setImageUri} />
          <Text style={styles.title}>Реєстрація</Text>
          <View style={[styles.innerContainer, styles.inputsContainer]}>
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
            <ButtonPrimary
              isActive={query.email !== "" && query.password !== ""}
              onPress={onRegisterHandler}
            >
              <Text style={styles.baseButtonText}>Зареєстуватися</Text>
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
    minHeight: "68%",
    maxHeight: Platform.OS === "android" ? "68%" : "78%",
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
