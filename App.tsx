import React, { useCallback, useContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ScreensContainer from "./src/ScreensContainer";
import { AppContext, AppProvider } from "./src/store/store";
import * as SplashScreen from "expo-splash-screen";
import { getBackgroundColor } from "./src/styling/themeHelper";

SplashScreen.preventAutoHideAsync().catch(() => null);

function AppContent() {
  const {
    state: { isLightTheme },
  } = useContext(AppContext);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    setAppIsReady(true);
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync().catch(() => null);
    }
  }, [appIsReady]);

  return (
    <GestureHandlerRootView
      style={[{ flex: 1 }, getBackgroundColor(isLightTheme)]}
      onLayout={onLayoutRootView}
    >
      <ScreensContainer />
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
