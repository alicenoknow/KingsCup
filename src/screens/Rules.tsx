import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useMemo, useState, useCallback } from "react";
import { View, StyleSheet, LayoutChangeEvent, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import CardsList from "../components/CardsList";
import DecoratedText from "../components/DecoratedText";
import { CustomToggleButton } from "../components/CustomToggleButton";
import { AppContext } from "../store/store";
import { Font } from "../styling/fonts";
import { Spacer } from "../styling/spacers";
import { getBackgroundColor, getOnBackgroundColor } from "../styling/themeHelper";
import { Screens } from "./types";

interface RulesProps {
  navigation: NativeStackNavigationProp<ParamListBase, Screens.RULES>;
  headerHeight?: number;
}

const Rules: React.FC<RulesProps> = ({ navigation }) => {
  const {
    state: { isLightTheme, useCustomRules },
    setUseCustom,
  } = useContext(AppContext);

  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const textStyle = useMemo(() => getOnBackgroundColor(isLightTheme), [isLightTheme]);
  const containerStyle = useMemo(() => [styles.container, getBackgroundColor(isLightTheme)], [isLightTheme]);

  const handleToggleChange = useCallback((value: boolean) => setUseCustom(value), [setUseCustom]);

  const handleLayoutChange = useCallback((event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  }, []);

  const customActionText = useMemo(
    () => (useCustomRules ? "custom actions enabled" : "custom actions disabled"),
    [useCustomRules]
  );

  return (
    <SafeAreaView style={containerStyle}>
      <View onLayout={handleLayoutChange}>
        <DecoratedText textStyle={[styles.title, textStyle]} text="Actions" />
        <DecoratedText
          textStyle={[styles.subtitle, textStyle]}
          text="tap on a card to see default action or to set custom action"
        />
        <View style={styles.toggle}>
          <CustomToggleButton value={useCustomRules} onChange={handleToggleChange} />
          <DecoratedText textStyle={[styles.statusText, textStyle]} text={customActionText} />
        </View>
      </View>
      <CardsList headerHeight={headerHeight} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: Platform.OS === "android" ? Spacer.LARGE_48 : 0,
  },
  title: {
    fontSize: Font.X_LARGE,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: Spacer.MEDIUM_16,
    marginBottom: Spacer.MEDIUM_24,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: Spacer.MEDIUM_24,
    marginHorizontal: Spacer.MEDIUM_24,
    flexWrap: "wrap",
    fontSize: Font.MEDIUM,
  },
  statusText: {
    textAlign: "center",
    paddingHorizontal: Spacer.MEDIUM_16,
    fontWeight: "bold",
    fontSize: Font.MEDIUM,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: Spacer.MEDIUM_24,
    marginHorizontal: Spacer.LARGE_48,
  },
});

export default Rules;
