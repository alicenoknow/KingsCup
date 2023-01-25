import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useContext } from "react";
import { View, StyleSheet, SafeAreaView, Text, Platform, Image, Dimensions } from "react-native";
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
import Logo from '../../assets/logo.png';
import { Font } from "../styling/fonts";

const LOGO = Image.resolveAssetSource(Logo).uri;
const LOGO_SIZE = Dimensions.get('window').width * 0.7


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
      <Image
        source={{uri: LOGO}}
        style={styles.logo}
      />
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
      <Text style={[styles.disclaimer, getOnBackgroundColor(isLightTheme)]}>
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
    paddingTop: Platform.OS === "android" ? Spacer.LARGE_48 : 0,
  },
  buttonsContainer: {
    flex: 1,
    margin: Spacer.MEDIUM_24,
    marginTop: "5%",
    width: "60%",
  },
  button: {
    marginVertical: Spacer.MEDIUM_24,
    backgroundColor: Colors.yellow,
  },
  themeToggle: {
    paddingVertical: Spacer.MEDIUM_16,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
    paddingHorizontal: Spacer.SMALL_8,
    fontSize: Font.LARGE,
  },
  disclaimer: {
    fontSize: Font.SMALL,
    paddingBottom: Spacer.LARGE_48,
  },
  logo: {
    marginTop: "10%",
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  }
});
