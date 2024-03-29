import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  LayoutChangeEvent,
  Platform,
} from "react-native";
import CardsList from "../components/CardsList";
import DecoratedText from "../components/DecoratedText";
import { CustomToggleButton } from "../components/CustomToggleButton";
import { AppContext } from "../store/store";
import { Colors } from "../styling/colors";
import { Font } from "../styling/fonts";
import { Spacer } from "../styling/spacers";
import {
  getBackgroundColor,
  getOnBackgroundColor,
} from "../styling/themeHelper";
import { Screens } from "./types";

interface RulesProps {
  navigation: NativeStackNavigationProp<ParamListBase, Screens.RULES>;
  headerHeight: number;
}

export default function Rules({ navigation }: RulesProps) {
  const {
    state: { isLightTheme, useCustomRules },
    setUseCustom,
  } = useContext(AppContext);

  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const handleChange = (value: boolean) => {
    setUseCustom(value);
  };

  const textStyle = getOnBackgroundColor(isLightTheme);
  return (
    <SafeAreaView style={[styles.container, getBackgroundColor(isLightTheme)]}>
      <View
        onLayout={(event: LayoutChangeEvent) => {
          setHeaderHeight(event.nativeEvent.layout.height);
        }}
      >
        <DecoratedText textStyle={[styles.title, textStyle]} text="Actions" />
        <DecoratedText
          textStyle={[styles.subtitle, textStyle]}
          text="tap on a card to see default action or to set custom action"
        />
        <View style={styles.toggle}>
          <CustomToggleButton value={useCustomRules} onChange={handleChange} />
          <DecoratedText
            textStyle={[styles.statusText, textStyle]}
            text={
              useCustomRules
                ? "custom actions enabled"
                : "custom actions disabled"
            }
          />
        </View>
      </View>
      <CardsList headerHeight={headerHeight} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: Platform.OS === "android" ? Spacer.LARGE_48 : 0,
  },
  content: {
    width: "100%",
  },
  item: {
    width: "100%",
    height: Spacer.LARGE_48,
    justifyContent: "center",
    alignContent: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.grey,
  },
  text: {
    textAlign: "center",
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
    justifyContent: "center",
    textAlignVertical: "center",
    alignContent: "center",
    paddingHorizontal: Spacer.MEDIUM_16,
    fontWeight: "bold",
    fontSize: Font.MEDIUM,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: Spacer.MEDIUM_24,
  },
});
