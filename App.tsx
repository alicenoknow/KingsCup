import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import GameBoard from "./src/screens/GameBoard";
import Rules from "./src/screens/Rules";
import React from "react";
import HelpIcon from "./src/components/HelpIcon";
import { AppProvider } from "./src/store/store";
import { Screens } from "./src/screens/types";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
          <Stack.Screen
            name={Screens.GAME_BOARD}
            component={GameBoard}
            options={{
              headerRight: () => <HelpIcon />,
              headerTintColor: Colors.secondaryText,
            }}
          />
          <Stack.Screen name={Screens.RULES} component={Rules} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
