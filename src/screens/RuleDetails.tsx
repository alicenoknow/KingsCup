import { RouteProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Platform,
} from "react-native";
import Button from "../components/Button";
import { AppContext } from "../store/store";
import { Colors } from "../styling/colors";
import { Font } from "../styling/fonts";
import { Spacer } from "../styling/spacers";
import {
  getBackgroundColor,
  getOnBackgroundColor,
} from "../styling/themeHelper";
import { CardName } from "../utils/cards";
import { getCardRule } from "../utils/rules";

interface RuleDetailsProps {
  route: RouteProp<{ params: { label: string; cards: CardName[] } }, "params">;
}

export default function RuleDetails({ route }: RuleDetailsProps) {
  const { cards, label } = route.params;
  const {
    state: { isLightTheme, customRules },
    setCustomRules,
  } = useContext(AppContext);

  const [customAction, setCustomAction] = useState<string>(
    customRules[cards[0]] || ""
  );
  const [isActionConfirmed, setActionConfirmed] = useState<boolean>(false);

  const confirmNewRule = () => {
    const newRules = customRules || {};
    for (const card of cards) {
      newRules[card] = customAction;
    }
    setCustomRules(newRules);
    setActionConfirmed(true);
  };

  const onValueChange = (value: string) => {
    setCustomAction(value);

    if (isActionConfirmed) {
      setActionConfirmed(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, getBackgroundColor(isLightTheme)]}>
      <Text style={[styles.title, getOnBackgroundColor(isLightTheme)]}>
        Action for card {label}
      </Text>
      <Text style={[styles.subtitle, getOnBackgroundColor(isLightTheme)]}>
        Default action
      </Text>
      <TextInput
        style={styles.input}
        value={getCardRule(cards[0])}
        multiline
        editable={false}
      />
      <Text style={[styles.subtitle, getOnBackgroundColor(isLightTheme)]}>
        🛠 Type your custom action
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onValueChange}
        value={customAction}
        placeholder="What's your action?"
        multiline
      />
      <Button
        label={isActionConfirmed ? "Saved" : "Confirm"}
        style={[styles.button, { opacity: isActionConfirmed ? 0.7 : 1 }]}
        textStyle={styles.buttonText}
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
    color: Colors.black
  },
  subtitle: {
    marginTop: Spacer.MEDIUM_16,
    fontSize: Font.MEDIUM,
  },
  button: {
    marginVertical: Spacer.MEDIUM_16,
    backgroundColor: Colors.yellow,
    padding: Spacer.MEDIUM_16 / 2,
    width: Spacer.LARGE_48 * 3,
  },
  buttonText: {
    color: Colors.onBackgroundLight,
    fontSize: Font.MEDIUM,
  },
  disclaimer: {
    fontSize: Font.MEDIUM,
  },
});
