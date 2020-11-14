import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import FilmList from "../Organisms/FilmList";
import {
  getFilmsFromApiWithSearchedText,
  getNowPlayingFilmsFromApi,
} from "../../API/TMDBApi";

export default function Search({ navigation }) {
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
      <FilmList films={films} navigation={navigation} />
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
