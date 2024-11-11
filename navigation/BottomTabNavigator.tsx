import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import PostsScreen from "../screens/PostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";

import ProfileIcon from "../assets/icons/user.svg";
import HomeIcon from "../assets/icons/grid.svg";
import AddIcon from "../assets/icons/Union.svg";
import BackIcon from "../assets/icons/arrow-left.svg";
import { colors } from "../styles/global";
import ButtonSecondary from "../components/ButtonSecondary";
import { textStyles } from "../styles/global";
import LogOutIcon from "../assets/icons/log-out.svg";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={() => ({
        headerShadowVisible: true,
        headerStyle: {
          backgroundColor: colors.white,
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 5,
        },
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: [styles.tabBarItem],
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation }) => ({
          headerTitle: "Публікації",
          headerTitleStyle: textStyles.titleHeaderText,
          headerRight: () => (
            <ButtonSecondary
              onButtonPress={() => {
                navigation.navigate("Login");
              }}
            >
              <LogOutIcon stroke={colors.dark_gray} />
            </ButtonSecondary>
          ),
          tabBarIcon: () => {
            return <HomeIcon stroke={colors.black_80} />;
          },
        })}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          headerTitle: "Створити публікацію",
          tabBarStyle: { display: "none" },
          headerTitleStyle: textStyles.titleHeaderText,
          headerLeft: () => (
            <ButtonSecondary
              onButtonPress={() => {
                navigation.goBack();
              }}
            >
              <BackIcon />
            </ButtonSecondary>
          ),

          tabBarIcon: ({ focused }) => {
            const index = navigation.getState().index;
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate(index === 0 ? "Create" : "Profile");
                }}
              >
                {index === 0 ? (
                  <AddIcon stroke={focused ? colors.black_80 : colors.white} />
                ) : (
                  <ProfileIcon
                    stroke={focused ? colors.black_80 : colors.white}
                  />
                )}
              </Pressable>
            );
          },
          tabBarItemStyle: {
            backgroundColor: colors.orange,
            flex: 0,
            width: 70,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5,
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            const index = navigation.getState().index;
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate(index === 2 ? "Create" : "Profile");
                }}
              >
                {index === 2 ? (
                  <AddIcon stroke={focused ? colors.black_80 : colors.white} />
                ) : (
                  <ProfileIcon
                    stroke={focused ? colors.white : colors.black_80}
                  />
                )}
              </Pressable>
            );
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 71,
    paddingTop: 9,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  tabBarItem: {
    flex: 0,
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
});
