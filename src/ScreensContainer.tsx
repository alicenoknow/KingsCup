import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HelpIcon from "./components/HelpIcon";
import GameBoard from "./screens/GameBoard";
import Home from "./screens/Home";
import RuleDetails from "./screens/RuleDetails";
import Rules from "./screens/Rules";
import { Screens } from "./screens/types";
import { AppContext } from "./store/store";
import { getOnBackgroundColor } from "./styling/themeHelper";

const Stack = createNativeStackNavigator();

export default function ScreensContainer() {
  const {
    state: { isLightTheme },
  } = useContext(AppContext);

  const commonScreenOptions = {
    headerTransparent: true,
    headerTitle: "",
    headerTintColor: getOnBackgroundColor(isLightTheme).color,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen name={Screens.HOME} component={Home} />
        <Stack.Screen
          name={Screens.GAME_BOARD}
          component={GameBoard}
          options={{
            headerRight: () => <HelpIcon />,
          }}
        />
        <Stack.Screen name={Screens.RULES} component={Rules} />
        <Stack.Screen
          name={Screens.RULES_DETAILS}
          component={RuleDetails}
          initialParams={{ cards: [] }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
