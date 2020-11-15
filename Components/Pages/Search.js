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
      });
    }
  };

  useEffect(() => {
    loadFilms();
  }, [searchText]);

  return (
    <View style={styles.main_container}>
      <View style={styles.header_search}>
        <TextInput
          style={styles.textinput}
          placeholder="Rechercher un film"
          placeholderTextColor="#02192b"
          onChangeText={searchTextInputChanged}
        />
      </View>

      <FilmList
        listStyle={styles.list_search}
        films={films}
        navigation={navigation}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
  },
  header_search: {
    backgroundColor: "#02192b",
    height: 20,
    position: "absolute",
    width: "100%",
    zIndex: 99,
    paddingLeft: 30,
    paddingRight: 30,
  },
  textinput: {
    height: 40,
    borderColor: "#02192b",
    borderWidth: 3,
    borderRadius: 25,
    backgroundColor: "#D3D3D3",
    color: "#FFFFFF",
    textAlign: "center",
  },
  list_search: {
    paddingTop: 50,
    backgroundColor: "transparent",
  },
});
