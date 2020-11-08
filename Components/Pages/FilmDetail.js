import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { getFilmDetailFromApi } from "../../API/TMDBApi";
import moment from "moment";

export default function FilmDetail({ idFilm, navigation }) {
  idFilm = navigation.state.params.idFilm;

  const [filmDetail, setFilmDetail] = useState(undefined);

  useEffect(() => {
    getFilmDetailFromApi(idFilm).then((data) => {
      setFilmDetail(data);
    });
  }, []);

  const displayFilm = () => {
    const film = filmDetail;
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image_film}
            source={{
              uri: `https://image.tmdb.org/t/p/w300${film.backdrop_path}`,
            }}
          />
          <View style={styles.information_container}>
            <View style={styles.title_header}>
              <Text style={styles.title_film}>
                {film.title}{" "}
                <Text style={styles.release_date}>
                  ({moment(new Date(film.release_date)).format("YYYY")})
                </Text>
              </Text>
            </View>

            <Text style={styles.genres}>
              {film.genres
                .map(function (genre) {
                  return genre.name;
                })
                .join(" • ")}
            </Text>
            <Text style={styles.runtime}>{film.runtime} minutes</Text>
            <Text style={styles.tagline}>{film.tagline}</Text>
            <Text style={styles.overview}>{film.overview}</Text>
          </View>
        </ScrollView>
      );
    }
  };

  return <View style={styles.main_container}>{displayFilm()}</View>;
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  scrollview_container: {
    flex: 1,
  },
  information_container: {
    padding: 20,
  },
  image_film: {
    height: 200,
    flex: 1,
  },
  title_header: {
    flexDirection: "row",
  },
  title_film: {
    fontWeight: "bold",
    fontSize: 25,
    flexWrap: "wrap",
    flex: 1,
  },
  release_date: {
    fontWeight: "normal",
    fontSize: 20,
    color: "grey",
  },
  genres: {
    fontSize: 17.5,
  },
  runtime: {
    fontSize: 15,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "italic",
  },
  overview: {
    fontSize: 15,
  },
});
