import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FilmList from "../Organisms/FilmList";
import { connect } from "react-redux";

function Favorites({ favoritesFilm, navigation }) {
  return (
    <FilmList
      listStyle={styles.list_search}
      films={favoritesFilm}
      navigation={navigation}
    />
  );
}

const styles = StyleSheet.create({
  list_search: {
    paddingTop: 10,
    backgroundColor: "transparent",
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Favorites);
