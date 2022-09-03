import { RouteProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import Button from "../components/Button";
import { ActionType, AppContext } from "../store/store";
import { Colors } from "../styling/colors";
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

  const [customAction, setCustomAction] = useState<string>("");

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
        🛠 Your custom action
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setCustomAction}
        value={customAction}
        multiline
      />
      <Button
        label={"Confirm"}
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={() => {
          const newRules = customRules || {};
          for (const card of cards) {
            newRules[card] = customAction;
          }
          setCustomRules(newRules);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  input: {
    width: "80%",
    height: "20%",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    padding: 20,
    margin: 12,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
  },
  button: {
    marginVertical: 20,
    backgroundColor: Colors.button,
    padding: 10,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
  },
  disclaimer: {
    fontSize: 12,
  },
});
