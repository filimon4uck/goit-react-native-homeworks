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

const Stack = createStackNavigator();

const StackNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Register"}
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Home"}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Comments"}
        component={CommentsScreen}
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
        component={MapScreen}
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
