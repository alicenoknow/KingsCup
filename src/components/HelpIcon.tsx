import React, { useContext, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Modal, Text } from "react-native";
import { AppContext } from "../store/store";
import { Colors } from "../styling/colors";
import { Spacer } from "../styling/spacers";
import { getCardRule } from "../utils/rules";
import Button from "./Button";

// TODO: format spacers heights etc and this file styling

export default function HelpIcon() {
  const {
    state: { currentIndex, cards },
  } = useContext(AppContext);
  const [isInfoVisible, setInfoVisibility] = useState<boolean>(false);

  const cardInfoModal = () => {
    if (!currentIndex) {
      return null;
    }
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
            <Text style={styles.modalText}>
              {getCardRule(cards[currentIndex].name)}
            </Text>
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
      <View style={styles.icon} />
      {cardInfoModal()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: Colors.blue,
    color: Colors.black,
    borderRadius: Spacer.SMALL_8,
    margin: Spacer.SMALL_8,
    height: 30,
    width: 30,
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
    backgroundColor: "white",
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
    backgroundColor: "pink",
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
