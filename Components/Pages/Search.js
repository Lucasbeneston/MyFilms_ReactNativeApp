import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Text, FlatList } from "react-native";
import FilmItem from "../Organisms/FilmItem";
import {
  getFilmsFromApiWithSearchedText,
  getNowPlayingFilmsFromApi,
} from "../../API/TMDBApi";

export default function Search() {
  const [films, setFilms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState(0);

  const searchTextInputChanged = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (searchText.length === 0) {
      getNowPlayingFilmsFromApi().then((data) => setFilms(data.results));
    } else {
      getFilmsFromApiWithSearchedText(searchText).then((data) => {
        setFilms(data.results);
        setResults(data.total_results);
      });
    }
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
      <FlatList
        data={films}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          console.log("onEndReached");
        }}
        renderItem={({ item }) => <FilmItem film={item} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  main_container: {
    marginTop: 50,
    flex: 1,
  },
  textinput: {
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 25,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
  },
  list_title: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
