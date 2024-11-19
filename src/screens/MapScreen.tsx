import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { StackScreenProps } from "@react-navigation/stack";
import { stackParamList } from "../navigation/StackNavigator";
type LoginScreenProps = StackScreenProps<stackParamList, "Login">;

const MapScreen: React.FC<LoginScreenProps> = ({ route }) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [error, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      if (route.params) {
        const { coordinates, title } = route.params;
        setLocation(coordinates);
        setTitle(title);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: location?.latitude ?? 37.78825,
          longitude: location?.longitude ?? -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        mapType="standard"
      >
        {location && title && (
          <Marker title={title} coordinate={location}></Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
