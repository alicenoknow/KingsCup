import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ScreensContainer from "./src/ScreensContainer";
import { AppProvider } from "./src/store/store";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <ScreensContainer />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
