import React, { useContext, useState, useCallback } from "react";
import { StyleSheet, SafeAreaView, TextInput, Platform } from "react-native";
import { RouteProp } from "@react-navigation/native";
import Button from "../components/Button";
import DecoratedText from "../components/DecoratedText";
import { AppContext } from "../store/store";
import { Colors } from "../styling/colors";
import { Font } from "../styling/fonts";
import { Spacer } from "../styling/spacers";
import { getBackgroundColor, getOnBackgroundColor } from "../styling/themeHelper";
import { getCardRule } from "../utils/rules";
import { RootStackParamList, Screens } from "./types";

type RuleDetailsRouteProp = RouteProp<RootStackParamList, Screens.RULES_DETAILS>;

export default function RuleDetails({ route }: { route: RuleDetailsRouteProp }): JSX.Element {
  const { cards = [], label = "" } = route.params || {};

  const {
    state: { isLightTheme, customRules },
    setCustomRules,
  } = useContext(AppContext);

  const [customAction, setCustomAction] = useState<string>(customRules[cards[0]] || "");
  const [isActionConfirmed, setActionConfirmed] = useState<boolean>(false);

  const confirmNewRule = useCallback(() => {
    const newRules = { ...customRules };
    cards.forEach((card) => {
      newRules[card] = customAction;
    });
    setCustomRules(newRules);
    setActionConfirmed(true);
  }, [cards, customAction, customRules, setCustomRules]);

  const onValueChange = useCallback((value: string) => {
    setCustomAction(value);
    if (isActionConfirmed) setActionConfirmed(false);
  }, [isActionConfirmed]);

  const themeStyles = getOnBackgroundColor(isLightTheme);

  return (
    <SafeAreaView style={[styles.container, getBackgroundColor(isLightTheme)]}>
      <DecoratedText
        textStyle={[styles.title, themeStyles]}
        text={`Action for card ${label}`}
      />
      <DecoratedText
        textStyle={[styles.subtitle, themeStyles]}
        text="Default action"
      />
      <TextInput
        style={styles.input}
        value={getCardRule(cards[0])}
        multiline
        scrollEnabled
        editable={false}
      />
      <DecoratedText
        textStyle={[styles.subtitle, themeStyles]}
        text="🛠 Type your custom action"
      />
      <TextInput
        style={styles.input}
        onChangeText={onValueChange}
        value={customAction}
        placeholder="What's your action?"
        scrollEnabled
        multiline
      />
      <Button
        label={isActionConfirmed ? "Saved" : "Confirm"}
        style={[styles.button, { opacity: isActionConfirmed ? 0.7 : 1 }]}
        onPress={confirmNewRule}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? Spacer.LARGE_48 : 0,
  },
  title: {
    fontSize: Font.X_LARGE,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: Spacer.MEDIUM_16,
  },
  input: {
    width: "80%",
    height: "25%",
    backgroundColor: Colors.white,
    borderRadius: Spacer.SMALL_8,
    borderWidth: 1,
    borderColor: Colors.grey,
    padding: Spacer.MEDIUM_16,
    margin: Spacer.MEDIUM_16,
    color: Colors.black,
    fontSize: Font.MEDIUM,
    fontFamily: Platform.OS === "android" ? "monospace" : "Menlo-Regular",
  },
  subtitle: {
    marginTop: Spacer.MEDIUM_16,
    fontSize: Font.MEDIUM,
  },
  button: {
    marginVertical: Spacer.MEDIUM_16,
    padding: Spacer.SMALL_8,
    paddingHorizontal: Spacer.MEDIUM_16,
  },
});
