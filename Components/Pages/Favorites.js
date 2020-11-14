import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FilmList from "../Organisms/FilmList";
import { connect } from "react-redux";

function Favorites({ favoritesFilm, navigation }) {
  return (
    <FilmList
      films={favoritesFilm}
      navigation={navigation}
      // favoriteList={true}
    />
  );
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Favorites);
