import React, { useContext, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Modal, Text } from "react-native";
import { AppContext } from "../store/store";
import { Colors } from "../styling/colors";
import { Spacer } from "../styling/spacers";
import { getOnBackgroundColor } from "../styling/themeHelper";
import { getCardRule } from "../utils/rules";
import Button from "./Button";

// TODO: format spacers heights etc and this file styling

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
            <Text style={styles.modalText}>{ruleDescription}</Text>
            <Button
              style={styles.button}
              textStyle={styles.buttonText}
              label={"ok"}
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
        <Text style={[styles.text, getOnBackgroundColor(isLightTheme)]}>?</Text>
      </View>
      {cardInfoModal()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
    fontWeight: "800",
    textAlign: "center",
  },
  icon: {
    backgroundColor: "transparent",
    borderRadius: Spacer.MEDIUM_24,
    borderWidth: 3,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignContent: "center",
  },

  modal: {
    flex: 1,
    width: 300,
    height: 500,
    backgroundColor: Colors.white,
    margin: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 35,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: Colors.button,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
