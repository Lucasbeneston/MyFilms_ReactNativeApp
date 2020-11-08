import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Search from "../Components/Pages/Search";
import FilmDetail from "../Components/Pages/FilmDetail";

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Rechercher",
    },
  },
  FilmDetail: {
    screen: FilmDetail,
  },
});

export default createAppContainer(SearchStackNavigator);
