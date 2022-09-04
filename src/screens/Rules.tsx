import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  LayoutChangeEvent,
  Platform,
} from "react-native";
import CardsList from "../components/CardsList";
import { UseCustomToggleButton } from "../components/UseCustomToggleButton";
import { AppContext } from "../store/store";
import { Colors } from "../styling/colors";
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
        <Text style={[styles.title, textStyle]}>Actions</Text>
        <Text style={[styles.subtitle, textStyle]}>
          tap on card to see default action or change it to custom one
        </Text>
        <View style={styles.toggle}>
          <UseCustomToggleButton
            value={useCustomRules}
            onChange={handleChange}
          />
          <Text style={[styles.statusText, textStyle]}>
            {useCustomRules
              ? "custom actions enabled"
              : "custom actions disabled"}
          </Text>
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
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  content: {
    width: "100%",
  },
  item: {
    width: "100%",
    height: 60,
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    marginBottom: 24,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
    marginHorizontal: 24,
    flexWrap: "wrap",
    fontSize: 18,
  },
  statusText: {
    textAlign: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    paddingHorizontal: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonText: {
    color: Colors.buttonText,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    margin: 24,
  },
});
