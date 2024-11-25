import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BottomFormScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string): void => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form Data:", formData);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/PhotoBG.png")}
        resizeMode="cover"
        style={styles.background}
      />
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={0}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => handleChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: "100%",
    resizeMode: "cover",
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    height: "65%",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 20,
    // paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default BottomFormScreen;
