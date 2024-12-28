import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GameBoard from "./screens/GameBoard";
import Home from "./screens/Home";
import RuleDetails from "./screens/RuleDetails";
import Rules from "./screens/Rules";
import { RootStackParamList, Screens } from "./screens/types";
import { AppContext } from "./store/store";
import { getOnBackgroundColor } from "./styling/themeHelper";

const Stack = createNativeStackNavigator<RootStackParamList>();

const commonScreenOptions = {
  headerTransparent: true,
  headerTitle: "",
};

export default function ScreensContainer() {
  const { state: { isLightTheme } } = useContext(AppContext);
  const headerTintColor = getOnBackgroundColor(isLightTheme).color;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            ...commonScreenOptions,
            headerTintColor,
          }}
        >
          <Stack.Screen name={Screens.HOME} component={Home} />
          <Stack.Screen
            name={Screens.GAME_BOARD}
            component={GameBoard}
          />
          <Stack.Screen name={Screens.RULES} component={Rules} />
          <Stack.Screen
            name={Screens.RULES_DETAILS}
            component={RuleDetails}
            initialParams={{ cards: [] }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
