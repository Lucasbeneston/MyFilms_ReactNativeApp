import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function FilmDetail({ idFilm, navigation }) {
  idFilm = navigation.state.params.idFilm;

  return (
    <View style={styles.main_container}>
      <Text>Détail du film {idFilm} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
});
