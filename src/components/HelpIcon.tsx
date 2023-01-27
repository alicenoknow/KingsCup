import React, { useContext, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Modal, Text, Platform } from "react-native";
import { AppContext } from "../store/store";
import { Colors } from "../styling/colors";
import { Font } from "../styling/fonts";
import { Spacer } from "../styling/spacers";
import { getButtonColor, getOnBackgroundColor, getOnButtonColor } from "../styling/themeHelper";
import { getCardRule } from "../utils/rules";
import Button from "./Button";
import DecoratedText from "./DecoratedText";


const ICON_SIZE = 42;
const ICON_BORDER = 3;

export default function HelpIcon() {
  const {
    state: { currentIndex, cards, isLightTheme, useCustomRules, customRules },
  } = useContext(AppContext);
  const [isInfoVisible, setInfoVisibility] = useState<boolean>(false);

  const cardInfoModal = () => {
    if (!currentIndex) {
      return null;
    }

    const ruleDescription =
      useCustomRules && customRules[cards[currentIndex]?.name]
        ? customRules[cards[currentIndex]?.name]
        : getCardRule(cards[currentIndex]?.name);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isInfoVisible}
        onRequestClose={() => {
          setInfoVisibility(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <DecoratedText textStyle={styles.modalText} text={ruleDescription ?? ''} />
            <Button
              style={[ getButtonColor(isLightTheme), styles.button]}
              textStyle={[getOnButtonColor(isLightTheme), styles.buttonText]}
              label={"Got it!"}
              onPress={() => setInfoVisibility(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <TouchableOpacity onPress={() => setInfoVisibility(!isInfoVisible)}>
      <View
        style={[
          styles.icon,
          { borderColor: getOnBackgroundColor(isLightTheme).color },
        ]}
      >
        <DecoratedText textStyle={[styles.text, getOnBackgroundColor(isLightTheme)]} text="?" />
      </View>
      {cardInfoModal()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  modal: {
    flex: 1,
    width: "70%",
    height: "50%",
    backgroundColor: Colors.white,
    margin: Spacer.LARGE_48,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: Spacer.MEDIUM_16,
    padding: Spacer.SMALL_8,
    elevation: 2,
    paddingHorizontal: Spacer.MEDIUM_16,
  },
  buttonText: {
    fontSize: Font.MEDIUM,
  },
  modalText: {
    marginBottom: Spacer.MEDIUM_16,
    textAlign: "center",
    fontSize: Font.MEDIUM,
  },
});
