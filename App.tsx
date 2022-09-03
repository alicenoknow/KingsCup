import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ScreensContainer from "./src/ScreensContainer";
import { AppProvider } from "./src/store/store";

export default function App() {
  return (
    <AppProvider>
      <ScreensContainer />
    </AppProvider>
  );
}
