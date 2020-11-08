import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Text, FlatList } from "react-native";
import FilmItem from "../Organisms/FilmItem";
import {
  getFilmsFromApiWithSearchedText,
  getNowPlayingFilmsFromApi,
} from "../../API/TMDBApi";
// import Navigation from "../../Navigation/Navigation";
import { connect } from "react-redux";

function Search({ navigation, favoritesFilm }) {
  const [films, setFilms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState(0);

  const searchTextInputChanged = (text) => {
    setSearchText(text);
  };

  const loadFilms = () => {
    if (searchText.length === 0) {
      getNowPlayingFilmsFromApi().then((data) => {
        setFilms(data.results);
      });
    } else {
      getFilmsFromApiWithSearchedText(searchText).then((data) => {
        setFilms(data.results);
        setResults(data.total_results);
      });
    }
  };

  useEffect(() => {
    loadFilms();
  }, [searchText]);

  const displayDetailForFilm = (idFilm) => {
    navigation.navigate("FilmDetail", { idFilm: idFilm });
  };

  return (
    <View style={styles.main_container}>
      <TextInput
        style={styles.textinput}
        placeholder="Rechercher un film"
        onChangeText={searchTextInputChanged}
      />
      <Text style={styles.list_title}>
        {searchText.length === 0
          ? "Films à l'affiche"
          : `Résultat de recherche : ${results} films`}
      </Text>
      <FlatList
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
    </View>
  );
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textinput: {
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 25,
    margin: 15,
    paddingLeft: 15,
  },
  list_title: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Search);
