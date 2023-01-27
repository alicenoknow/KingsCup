import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useContext } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  Dimensions,
} from "react-native";
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
import Logo from "../../assets/main.png";
import { Font } from "../styling/fonts";
import DecoratedText from "../components/DecoratedText";
import AnimatedEmoji from "../components/AnimatedEmoji";

const LOGO = Image.resolveAssetSource(Logo).uri;
const LOGO_SIZE = Dimensions.get("window").width * 0.5;

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
      <Image source={{ uri: LOGO }} style={styles.logo} />
      <View style={{ ...getBackgroundColor(isLightTheme, true) }}>
        <DecoratedText
          textStyle={[styles.title, getOnBackgroundColor(isLightTheme)]}
          text="King's Cup"
        />
      </View>
      <View style={{ flex: 1, width: "100%" }} />
      <View style={styles.buttonsContainer}>
        <Button
          label={"Play"}
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
        <DecoratedText textStyle={styles.text} text="🌚" />
        <ThemeToggleButton />
        <DecoratedText textStyle={styles.text} text="🌞" />
      </View>
      <DecoratedText
        textStyle={[styles.disclaimer, getOnBackgroundColor(isLightTheme)]}
        text="created by alicenoknow"
      />
      {Array.from(Array(8).keys()).map((key) => (
        <AnimatedEmoji key={key} emoji="🍺" />
      ))}
      {Array.from(Array(8).keys()).map((key) => (
        <AnimatedEmoji key={key} emoji="👑" />
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
  },
  button: {
    marginBottom: Spacer.MEDIUM_16,
  },
  themeToggle: {
    marginBottom: Spacer.MEDIUM_16,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: Font.LARGE,
    alignSelf: "center",
    marginHorizontal: Spacer.SMALL_8,
  },
  disclaimer: {
    fontSize: Font.SMALL,
    marginBottom: Spacer.LARGE_48,
  },
  logo: {
    marginTop: "10%",
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  title: {
    fontSize: Font.TITLE,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
