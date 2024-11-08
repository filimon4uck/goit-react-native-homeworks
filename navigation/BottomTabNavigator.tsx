import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={"Login"} component={LoginScreen} />
      <Tab.Screen name={"Register"} component={RegistrationScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
