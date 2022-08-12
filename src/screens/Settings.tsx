import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

export default function Settings() {
    return <SafeAreaView><View style={styles.container}/></SafeAreaView>
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  