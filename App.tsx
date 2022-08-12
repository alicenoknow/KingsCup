import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import GameBoard from "./src/screens/GameBoard";
import Settings from "./src/screens/Settings";
import Rules from "./src/screens/Rules";
import React, { Context } from "react";
import HelpIcon from "./src/components/HelpIcon";
import { AppProvider } from "./src/store/store";
import { Screens } from "./src/screens/types";

const commonScreenOptions = {
  headerTransparent: true,
  headerTitle: "",
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={commonScreenOptions}>
          <Stack.Screen name={Screens.HOME} component={Home} />
          <Stack.Screen name={Screens.SETTINGS} component={Settings} />
          <Stack.Screen
            name={Screens.GAME_BOARD}
            component={GameBoard}
            options={{ headerRight: () => <HelpIcon /> }}
          />
          <Stack.Screen name={Screens.RULES} component={Rules} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
