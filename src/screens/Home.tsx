import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from "../components/Button";
import { ThemeToggleButton } from "../components/ThemeToggleButton";
import { AppContext } from "../store/store";
import { Spacer } from "../styling/spacers";
import { getBackgroundColor, getOnBackgroundColor } from "../styling/themeHelper";
import { Screens } from "./types";
import Logo from "../../assets/main.png";
import { Font } from "../styling/fonts";
import DecoratedText from "../components/DecoratedText";
import AnimatedEmoji from "../components/AnimatedEmoji";

const LOGO_SIZE = Dimensions.get("window").width * 0.5;
const LOGO_URI = Image.resolveAssetSource(Logo).uri;
const EMOJI_COUNT = 15;

interface HomeProps {
  navigation: NativeStackNavigationProp<ParamListBase, Screens.HOME>;
}

export default function Home({ navigation }: HomeProps) {
  const {
    state: { isLightTheme },
  } = useContext(AppContext);

  const emojiArray = Array.from(Array(EMOJI_COUNT).keys());

  return (
    <SafeAreaView style={[styles.container, getBackgroundColor(isLightTheme)]}>
      <Image source={{ uri: LOGO_URI }} style={styles.logo} />
      <DecoratedText textStyle={[styles.title, getOnBackgroundColor(isLightTheme)]} text="King's Cup" />

      <View style={styles.flexOne} />

      <View style={styles.buttonsContainer}>
        <Button label="Play" style={styles.button} onPress={() => navigation.navigate(Screens.GAME_BOARD)} />
        <Button label="Settings" style={styles.button} onPress={() => navigation.navigate(Screens.RULES)} />
      </View>

      <View style={styles.themeToggle}>
        <DecoratedText textStyle={styles.text} text="🌚" />
        <ThemeToggleButton />
        <DecoratedText textStyle={styles.text} text="🌞" />
      </View>

      <DecoratedText
        textStyle={[styles.disclaimer, getOnBackgroundColor(isLightTheme)]}
        text="created by alicenoknow"
      />

      {emojiArray.map((key) => (
        <AnimatedEmoji key={`beer-${key}`} emoji="🍺" />
      ))}

      {emojiArray.map((key) => (
        <AnimatedEmoji key={`crown-${key}`} emoji="👑" />
      ))}
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
    width: "60%",
    zIndex: 1,
  },
  button: {
    marginBottom: Spacer.MEDIUM_16,
  },
  themeToggle: {
    marginBottom: Spacer.MEDIUM_16,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 1,
  },
  text: {
    fontSize: Font.LARGE,
    alignSelf: "center",
    marginHorizontal: Spacer.SMALL_8,
    zIndex: 1,
  },
  disclaimer: {
    fontSize: Font.SMALL,
    marginBottom: Spacer.LARGE_48,
  },
  logo: {
    marginTop: "5%",
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    opacity: 0.9,
    zIndex: 1,
  },
  title: {
    fontSize: Font.TITLE,
    fontWeight: "bold",
    alignSelf: "center",
    zIndex: 1,
  },
  flexOne: {
    flex: 1,
    width: "100%",
  },
});
