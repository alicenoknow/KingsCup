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
    state: { currentCard },
  } = useContext(AppContext);
  const [isInfoVisible, setInfoVisibility] = useState<boolean>(false);

  const cardInfoModal = () => {
    if (!currentCard) {
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
              {getCardRule(currentCard.name)}
            </Text>
            <Button
              style={[styles.button, styles.buttonClose]}
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
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
