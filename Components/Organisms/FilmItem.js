import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";

export default function FilmItem({ film, displayDetailForFilm }) {
  return (
    <TouchableOpacity
      style={styles.main_container}
      onPress={() => displayDetailForFilm(film.id)}
    >
      <Image
        style={styles.image_film}
        source={{ uri: `https://image.tmdb.org/t/p/w300${film.poster_path}` }}
      />
      <View style={styles.information_container}>
        <View style={styles.information_header}>
          <Text style={styles.title_film}>{film.title}</Text>
          <Text style={styles.vote_film}>{film.vote_average}</Text>
        </View>
        <Text style={styles.description_film} numberOfLines={5}>
          {film.overview}
        </Text>
        <Text style={styles.release_film}>Sorti le {film.release_date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    height: 200,
    padding: 10,
    flexDirection: "row",
  },
  information_container: {
    flex: 2,
    padding: 10,
    flexDirection: "column",
  },
  information_header: {
    flexDirection: "row",
    alignItems: "center",
  },
  image_film: {
    flex: 1,
    height: "100%",
    backgroundColor: "grey",
    borderRadius: 15,
  },
  title_film: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 2,
    flexWrap: "wrap",
  },
  description_film: {
    flex: 2,
    fontStyle: "italic",
    color: "grey",
  },
});
