import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
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
    return null;
  }

  return <LoginScreen />;
};

export default App;
