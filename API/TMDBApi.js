import { API_TOKEN } from "@env";

export function getFilmsFromApiWithSearchedText(text) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${text}`;
  return fetch(url).then((response) =>
    response.json().catch((error) => console.log(error))
  );
}

export function getTopRatedFilmsFromApi() {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_TOKEN}&language=fr&page=1`;
  return fetch(url).then((response) =>
    response.json().catch((error) => console.log(error))
  );
}

export function getPopularFilmsFromApi() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_TOKEN}&language=fr&page=1`;
  return fetch(url).then((response) =>
    response.json().catch((error) => console.log(error))
  );
}

export function getNowPlayingFilmsFromApi() {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_TOKEN}&language=fr&page=1`;
  return fetch(url).then((response) =>
    response.json().catch((error) => console.log(error))
  );
}
