import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { getFilmDetailFromApi } from "../../API/TMDBApi";
import moment from "moment";
import { connect } from "react-redux";

function FilmDetail({ idFilm, navigation, dispatch, favoritesFilm }) {
  idFilm = navigation.state.params.idFilm;

  const [filmDetail, setFilmDetail] = useState(undefined);

  useEffect(() => {
    const favoriteFilmIndex = favoritesFilm.findIndex(
      (item) => item.id === idFilm
    );
    if (favoriteFilmIndex !== -1) {
      setFilmDetail(favoritesFilm[favoriteFilmIndex]);
      return;
    }
    getFilmDetailFromApi(idFilm).then((data) => {
      setFilmDetail(data);
    });
  }, []);

  const toggleFavorite = () => {
    const action = { type: "TOGGLE_FAVORITE", value: filmDetail };
    dispatch(action);
  };

  const displayFavoriteImage = () => {
    let sourceImage = require("../../Images/ic_favorite_border.png");
    if (favoritesFilm.findIndex((item) => item.id === filmDetail.id) !== -1) {
      sourceImage = require("../../Images/ic_favorite.png");
    }
    return <Image source={sourceImage} style={styles.favorite_image} />;
  };

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
              <TouchableOpacity
                style={styles.favorite_container}
                onPress={toggleFavorite}
              >
                {displayFavoriteImage()}
              </TouchableOpacity>
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
  favorite_container: {
    alignItems: "center",
    paddingLeft: 15,
  },
  favorite_image: {
    width: 35,
    height: 35,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};
export default connect(mapStateToProps)(FilmDetail);
