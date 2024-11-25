import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StackNavigator from "./src/navigation/StackNavigator";
import { Provider, useDispatch } from "react-redux";
import store from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { authStateChanged } from "./src/utils/auth";
import { colors } from "./src/styles/global";
import { View } from "react-native";
import BottomFormScreen from "./src/screens/Test";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      if (fontsLoaded) {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!appIsReady) {
    return undefined;
  }

  return (
    <Provider store={store.store}>
      <PersistGate persistor={store.persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthListener />
          {/* <BottomFormScreen /> */}
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authStateChanged(dispatch);
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
