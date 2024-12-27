import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import { AppContext } from "../store/store";
import { Colors } from "../styling/colors";
import { Font } from "../styling/fonts";
import { Spacer } from "../styling/spacers";
import { getOnBackgroundColor } from "../styling/themeHelper";
import { getCardRule } from "../utils/rules";
import Button from "./Button";
import DecoratedText from "./DecoratedText";

const ICON_SIZE = 42;
const ICON_BORDER = 3;

export default function HelpIcon() {
  const {
    state: { currentIndex, cards, isLightTheme, useCustomRules, customRules },
  } = useContext(AppContext);
  const [isInfoVisible, setInfoVisibility] = useState(false);

  const toggleInfoVisibility = useCallback(() => {
    setInfoVisibility((prev) => !prev);
  }, []);

  const ruleDescription =
    useCustomRules && customRules[cards[currentIndex]?.name]
      ? customRules[cards[currentIndex]?.name]
      : getCardRule(cards[currentIndex]?.name);

  return (
    <TouchableOpacity style={styles.touchable} onPress={() => setInfoVisibility(true)}>
      <View
        style={[
          styles.icon,
          { borderColor: getOnBackgroundColor(isLightTheme).color },
        ]}
      >
        <DecoratedText
          textStyle={[styles.text, getOnBackgroundColor(isLightTheme)]}
          text="?"
        />
      </View>
      <Modal
        animationType="slide"
        transparent
        visible={isInfoVisible}
        onRequestClose={() => setInfoVisibility(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DecoratedText
              textStyle={styles.modalText}
              text={ruleDescription || ""}
            />
            <Button
              style={styles.button}
              textStyle={styles.buttonText}
              label="Got it!"
              onPress={toggleInfoVisibility}
            />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: { padding: Spacer.MEDIUM_16 },
  text: {
    fontSize: Platform.OS === "android" ? Font.LARGE : Font.MEDIUM,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    backgroundColor: "transparent",
    borderRadius: Spacer.MEDIUM_24,
    borderWidth: ICON_BORDER,
    height: ICON_SIZE,
    width: ICON_SIZE,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacer.MEDIUM_24,
  },
  modalView: {
    margin: Spacer.MEDIUM_24,
    backgroundColor: Colors.white,
    borderRadius: Spacer.MEDIUM_24,
    padding: Spacer.MEDIUM_24,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: Spacer.MEDIUM_16,
    padding: Spacer.SMALL_8,
    elevation: 2,
    paddingHorizontal: Spacer.MEDIUM_16,
    backgroundColor: Colors.button,
  },
  buttonText: {
    fontSize: Font.MEDIUM,
    color: Colors.buttonText,
  },
  modalText: {
    marginBottom: Spacer.MEDIUM_16,
    textAlign: "center",
    fontSize: Font.MEDIUM,
  },
});
