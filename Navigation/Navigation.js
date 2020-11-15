import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Search from "../Components/Pages/Search";
import FilmDetail from "../Components/Pages/FilmDetail";
import Favorites from "../Components/Pages/Favorites";
import User from "../Components/Pages/User";

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: "My Films",
      headerStyle: {
        backgroundColor: "#02192b",
        shadowColor: "transparent",
      },
      headerTintColor: "#D3D3D3",
    },
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: "Détail du film",
      headerStyle: {
        backgroundColor: "#02192b",
        shadowColor: "transparent",
      },
      headerTintColor: "#D3D3D3",
    },
  },
});

const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: "Mes films favoris",
      headerStyle: {
        backgroundColor: "#02192b",
        shadowColor: "transparent",
      },
      headerTintColor: "#D3D3D3",
    },
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: "Détail du film",
      headerStyle: {
        backgroundColor: "#02192b",
        shadowColor: "transparent",
      },
      headerTintColor: "#D3D3D3",
    },
  },
});

const UserStackNavigator = createStackNavigator({
  User: {
    screen: User,
    navigationOptions: {
      title: "Mon profile",
      headerStyle: {
        backgroundColor: "#02192b",
        shadowColor: "transparent",
      },
      headerTintColor: "#D3D3D3",
    },
  },
});

const MoviesTabNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <View style={styles.container_icon}>
              <Image
                source={require("../Images/ic_search.png")}
                style={styles.icon}
              />
            </View>
          );
        },
      },
    },
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <View style={styles.container_icon}>
              <Image
                source={require("../Images/ic_favorite.png")}
                style={styles.icon}
              />
            </View>
          );
        },
      },
    },
    User: {
      screen: UserStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <View style={styles.container_icon}>
              <Image
                source={require("../Images/ic_user.png")}
                style={styles.icon}
              />
            </View>
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      // activeBackgroundColor: "#DDDDDD",
      // inactiveBackgroundColor: "#FFFFFF",

      style: {
        borderTopColor: "transparent",
        backgroundColor: "#02192b",
        position: "absolute",
        // borderTopRightRadius: 30,
        // borderTopLeftRadius: 30,
        height: 30,
      },
      // activeTintColor: "#e91e63",
    },
  }
);

const styles = StyleSheet.create({
  container_icon: {
    backgroundColor: "#D3D3D3",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
    position: "absolute",
    borderColor: "#02192b",
    borderWidth: 3,
    top: -20,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default createAppContainer(MoviesTabNavigator);
