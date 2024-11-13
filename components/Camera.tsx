import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ButtonSecondary from "./ButtonSecondary";
import CameraIcon from "../assets/icons/camera.svg";
import { colors, textStyles } from "../styles/global";

const Camera: React.FC = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef();

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>is not available</Text>
      </View>
    );
  }
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  const takePicture = async () => {
    const image = await camera?.current?.takePictureAsync();
    await MediaLibrary.saveToLibraryAsync(image.uri);
  };

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
        </View>
        <ButtonSecondary
          onButtonPress={takePicture}
          outerStyles={styles.cameraContainer}
        >
          <CameraIcon fill={colors.white} width={24} height={24} />
        </ButtonSecondary>
      </CameraView>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "center",
    overflow: "hidden",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: colors.black_80,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    ...textStyles.regularText,
    fontSize: 14,
    color: colors.white,
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
});
