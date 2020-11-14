import React from "react";
import { StyleSheet, FlatList } from "react-native";
import FilmItem from "../Molecules/FilmItem";
import { connect } from "react-redux";

function FilmList({ navigation, favoritesFilm, films }) {
  const displayDetailForFilm = (idFilm) => {
    navigation.navigate("FilmDetail", { idFilm: idFilm });
  };

  return (
    <FlatList
      style={styles.list}
      data={films}
      extraData={favoritesFilm}
      keyExtractor={(item) => item.id.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        console.log("Fin de la page");
      }}
      renderItem={({ item }) => (
        <FilmItem
          film={item}
          isFilmFavorite={
            favoritesFilm.findIndex((film) => film.id === item.id) !== -1
              ? true
              : false
          }
          displayDetailForFilm={displayDetailForFilm}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(FilmList);
