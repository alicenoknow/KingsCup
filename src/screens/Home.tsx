import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useContext } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import Button from "../components/Button";
import { ThemeToggleButton } from "../components/ThemeToggleButton";
import { AppContext } from "../store/store";
import { Colors } from "../styling/colors";
import { Spacer } from "../styling/spacers";
import {
  getBackgroundColor,
  getOnBackgroundColor,
} from "../styling/themeHelper";
import { Screens } from "./types";

interface HomeProps {
  navigation: NativeStackNavigationProp<ParamListBase, Screens.HOME>;
}

export default function Home(props: HomeProps) {
  const { navigation } = props;
  const {
    state: { isLightTheme },
  } = useContext(AppContext);

  return (
    <SafeAreaView style={[styles.container, getBackgroundColor(isLightTheme)]}>
      <View style={styles.buttonsContainer}>
        <Button
          label={"Start"}
          style={styles.button}
          onPress={() => {
            navigation.navigate(Screens.GAME_BOARD);
          }}
        />
        <Button
          label={"Settings"}
          style={styles.button}
          onPress={() => {
            navigation.navigate(Screens.RULES);
          }}
        />
      </View>
      <View style={styles.themeToggle}>
        <Text style={styles.text}>🌚</Text>
        <ThemeToggleButton />
        <Text style={styles.text}>🌞</Text>
      </View>
      <Text style={getOnBackgroundColor(isLightTheme)}>
        created by alicenoknow
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flex: 1,
    margin: Spacer.MEDIUM_24,
    marginTop: "30%",
    width: "60%",
  },
  button: {
    marginVertical: 20,
    backgroundColor: Colors.yellow,
  },
  themeToggle: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    fontSize: 22,
  },
});
