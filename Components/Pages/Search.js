import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput, FlatList } from "react-native";
import FilmItem from "../Organisms/FilmItem";
import { getFilmsFromApiWithSearchedText } from "../../API/TMDBApi";

export default function Search() {
  const [films, setFilms] = useState({
    arrayFilms: [],
    searchText: "",
  });

  const searchTextInputChanged = (text) => {
    setFilms({ searchText: text });
  };

  const loadFilms = () => {
    if (films.searchText.length > 0) {
      getFilmsFromApiWithSearchedText(films.searchText).then((data) =>
        setFilms(data.results)
      );
    }
  };

  return (
    <View style={styles.main_container}>
      <TextInput
        style={styles.textinput}
        placeholder="Titre du film"
        onChangeText={searchTextInputChanged}
      />
      <Button title="Rechercher" onPress={loadFilms} />
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
});
