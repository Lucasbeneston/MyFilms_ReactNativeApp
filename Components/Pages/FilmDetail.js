import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Share,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Animated,
} from "react-native";
import { getFilmDetailFromApi } from "../../API/TMDBApi";
import moment from "moment";
import { connect } from "react-redux";

function FilmDetail({ idFilm, navigation, dispatch, favoritesFilm }) {
  idFilm = navigation.state.params.idFilm;
  const [filmDetail, setFilmDetail] = useState(undefined);
  const growUpAnim = useRef(new Animated.Value(0)).current;

  const growUp = () => {
    Animated.timing(growUpAnim, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    growUp();
  }, []);

  // WIP : Pb avec la fonction static
  FilmDetail.navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    if (params.film != undefined && Platform.OS === "ios") {
      return {
        headerRight: (
          <TouchableOpacity
            style={styles.share_touchable_headerrightbutton}
            onPress={shareFilm}
          >
            <Image
              style={styles.share_image}
              source={require("../../Images/ic_share.png")}
            />
          </TouchableOpacity>
        ),
      };
    }
  };

  const updateNavigationParams = () => {
    navigation.setParams({
      shareFilm: shareFilm,
      film: filmDetail,
    });
  };

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

  useEffect(() => {
    updateNavigationParams();
  }, [filmDetail]);

  const shareFilm = () => {
    Share.share({ title: filmDetail.title, message: filmDetail.overview });
  };

  // Button spécifique à Androïd
  const displayFloatingActionButton = () => {
    if (filmDetail != undefined && Platform.OS === "android") {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={shareFilm}
        >
          <Image
            style={styles.share_image}
            source={require("../../Images/ic_share.png")}
          />
        </TouchableOpacity>
      );
    }
  };

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
          <Animated.View style={{ height: growUpAnim }}>
            <Image
              style={styles.image_film}
              source={{
                uri: `https://image.tmdb.org/t/p/w300${film.backdrop_path}`,
              }}
            />
          </Animated.View>

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

  return (
    <View style={styles.main_container}>
      {displayFilm()}
      {displayFloatingActionButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
  },
  scrollview_container: {
    flex: 1,
  },
  information_container: {
    padding: 30,
  },
  image_film: {
    height: null,
    width: null,
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
  share_touchable_floatingactionbutton: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: "#e91e63",
    justifyContent: "center",
    alignItems: "center",
  },
  share_touchable_headerrightbutton: {
    marginRight: 8,
  },
  share_image: {
    width: 30,
    height: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};
export default connect(mapStateToProps)(FilmDetail);
