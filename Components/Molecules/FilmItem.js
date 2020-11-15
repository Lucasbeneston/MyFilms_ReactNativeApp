import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import moment from "moment";

export default function FilmItem({
  film,
  displayDetailForFilm,
  isFilmFavorite,
}) {
  const displayFavoriteImage = () => {
    if (isFilmFavorite) {
      return (
        <View style={styles.favorite_container}>
          <Image
            style={styles.favorite_image}
            source={require("../../Images/ic_favorite.png")}
          />
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.main_container}
      onPress={() => displayDetailForFilm(film.id)}
    >
      <View style={styles.background_container}>
        <Image
          style={styles.image_film}
          source={{ uri: `https://image.tmdb.org/t/p/w300${film.poster_path}` }}
        />
        <View style={styles.information_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_film}>
              {film.title}{" "}
              <Text style={styles.release_date}>
                ({moment(new Date(film.release_date)).format("YYYY")})
              </Text>
            </Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_film} numberOfLines={5}>
              {film.overview}
            </Text>
          </View>

          <View style={styles.vote_container}>
            <View style={styles.container_progress_bar}>
              <View
                style={[
                  styles.progress_bar,
                  {
                    width: `${film.vote_average * 10}%`,
                  },
                ]}
              />
            </View>
            <View style={styles.container_vote_average}>
              <Text style={styles.vote_average}>{film.vote_average}</Text>
            </View>
            <View>{displayFavoriteImage()}</View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    height: 250,
    flexDirection: "row",
    backgroundColor: "transparent",
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  background_container: {
    flex: 1,
    height: 220,
    borderRadius: 15,
    backgroundColor: "#034566",
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
  },
  image_film: {
    width: "40%",
    height: 235,
    marginTop: -30,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: "grey",
  },
  information_container: {
    flex: 1,
    marginTop: 15,
    marginRight: 15,
    marginBottom: 15,
    width: "100%",
  },
  header_container: {
    marginBottom: 15,
  },
  title_film: {
    fontWeight: "bold",
    fontSize: 17.5,
    flexWrap: "wrap",
    color: "#D3D3D3",
  },
  release_date: {
    fontWeight: "400",
    fontSize: 15,
    color: "#808080",
  },
  description_container: {
    flex: 1,
  },
  description_film: {
    fontStyle: "italic",
    color: "#C0C0C0",
  },

  vote_container: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
    flexDirection: "row",
  },
  container_progress_bar: {
    backgroundColor: "#032441",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flex: 1,
  },
  progress_bar: {
    borderRadius: 5,
    height: 10,
    backgroundColor: "#1bd3ae",
  },
  container_vote_average: {
    backgroundColor: "#1bd3ae",
    padding: 5,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginLeft: "-1%",
  },
  vote_average: {
    fontSize: 10,
    color: "#032441",
    fontWeight: "700",
  },

  favorite_container: {
    padding: 5,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#03b5e0",
    borderRadius: 30,
    marginLeft: 10,
  },
  favorite_image: {
    width: 15,
    height: 15,
  },
});
