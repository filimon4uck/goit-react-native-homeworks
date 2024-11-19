import {
  Image,
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
import { StackScreenProps } from "@react-navigation/stack";
import { stackParamList } from "../navigation/StackNavigator";
import * as ImagePicker from "expo-image-picker";
import CameraIcon from "../assets/icons/camera.svg";
import { addDataToFirestore } from "../utils/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../store/authSlice/selectors";
import { selectPosts } from "../store/postsSlice/selectors";
import { addPost } from "../store/postsSlice/slice";

type CreatePostProps = StackScreenProps<stackParamList>;
const CreatePostsScreen = () => {
  const [query, setQuery] = useState({ title: "", country: "" });
  const [loadedImage, setLoadedImage] = useState<string | null>(null);
  const [isTakePicture, setTakePicture] = useState<boolean>(false);
  const onChangeHandler = (field: string, text: string) => {
    setQuery((prevState) => ({ ...prevState, [field]: text }));
  };
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const userInfo = useSelector(selectUserInfo);
  const posts = useSelector(selectPosts);
  const navigation = useNavigation<CreatePostProps["navigation"]>();
  const dispatch = useDispatch();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setLoadedImage(result.assets[0].uri);
      setTakePicture(true);
    }
  };
  const setLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const result = await Location.reverseGeocodeAsync(location.coords);
    const country = `${result[0].city}, ${result[0].country}`;
    setQuery({
      ...query,
      country: country,
    });
  };
  const clearFields = () => {
    setQuery({ title: "", country: "" });
    setLoadedImage(null);
    setLocation(null);
  };
  const onPublic = async () => {
    if (userInfo) {
      const result = await addDataToFirestore(userInfo?.uid, posts, {
        id: "",
        title: query.title,
        photoURL: loadedImage || "",
        coordinates: location?.coords,
        country: query.country,
        comments: [],
        likes: 0,
      });
      if (result) {
        dispatch(addPost(result));
        clearFields();
        navigation.navigate("Posts");
      }
    }
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
            <View style={{ width: "100%", height: "100%" }}>
              {isTakePicture && loadedImage ? (
                <View
                  style={{
                    flex: 1,
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: loadedImage }}
                    resizeMode="cover"
                  />
                  <ButtonSecondary
                    onButtonPress={() => {
                      setTakePicture(false);
                    }}
                    outerStyles={styles.cameraContainer}
                  >
                    <CameraIcon fill={colors.white} width={24} height={24} />
                  </ButtonSecondary>
                </View>
              ) : (
                <Camera
                  onPictureTaken={setLoadedImage}
                  setPictureTaken={setTakePicture}
                />
              )}
            </View>
            <ButtonSecondary onButtonPress={pickImage}>
              <Text style={styles.addButton}>{`${
                loadedImage ? "Редагувати фото" : "Завантажити фото"
              }`}</Text>
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
              value={query.country}
              field="country"
              onChangeText={onChangeHandler}
              placeholder="Місцевість..."
            >
              <ButtonSecondary onButtonPress={setLocationAsync}>
                <MapPin stroke={colors.dark_gray} />
              </ButtonSecondary>
            </InputCreate>
          </View>

          <ButtonPrimary
            onPress={onPublic}
            isActive={true}
            buttonStyle={styles.publishButton}
          >
            <Text style={styles.publishButtonText}>Опублікувати</Text>
          </ButtonPrimary>
        </View>
        <ButtonSecondary
          onButtonPress={clearFields}
          outerStyles={styles.deleteBtn}
        >
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
  cameraContainer: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 100,
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white_03,
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
