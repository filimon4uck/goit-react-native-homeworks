import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import CommentsScreen from "../screens/CommentsScreen";
import { colors, textStyles } from "../styles/global";
import ButtonSecondary from "../components/ButtonSecondary";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../assets/icons/arrow-left.svg";
import MapScreen from "../screens/MapScreen";
import { coordType } from "../components/Post";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../store/authSlice/selectors";
import { View } from "react-native";

const Stack = createStackNavigator();
export type stackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Comments: { id: string };
  Map: { coordinates: coordType | undefined; title: string };
  Profile: undefined;
  Posts: undefined;
};

const StackNavigator = () => {
  const user = useSelector(selectUserInfo);

  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen as React.FC}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={"Register"}
            component={RegistrationScreen as React.FC}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name={"Home"}
          component={BottomTabNavigator as React.FC}
          options={{
            headerShown: false,
          }}
        />
      )}

      <Stack.Screen
        name={"Comments"}
        component={CommentsScreen as React.FC}
        options={{
          title: "Коментарі",
          headerTitleAlign: "center",
          headerTitleStyle: { ...textStyles.titleHeaderText },
          headerLeft: () => (
            <ButtonSecondary
              onButtonPress={() => {
                navigation.goBack();
              }}
            >
              <BackIcon color={colors.black_80} />
            </ButtonSecondary>
          ),
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
          headerRightContainerStyle: {
            paddingRight: 16,
          },
        }}
      />
      <Stack.Screen
        name={"Map"}
        component={MapScreen as React.FC}
        options={({ navigation }) => ({
          headerTitle: "Карти",
          headerTitleStyle: textStyles.titleHeaderText,
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
          headerRightContainerStyle: {
            paddingRight: 16,
          },
          headerLeft: () => (
            <ButtonSecondary
              onButtonPress={() => {
                navigation.goBack();
              }}
            >
              <BackIcon stroke={colors.dark_gray} />
            </ButtonSecondary>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
