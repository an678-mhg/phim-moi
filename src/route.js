import Content from "./page/Home/Content";
import ViewMorePage from "./page/ViewMore/ViewMorePage";
import DetailsMovie from "./page/Details/Details";
import Search from "./page/Search/Search";
import SearchResults from "./page/Search/SearchResults";
import WatchTv from "./page/Watch/Watch";
import WatchMovie from "./page/Watch/WatchMovie";
import LoginPage from "./page/LoginPage/LoginPage";
import Movies from "./page/Movies/Movies";
import Tv_Shows from "./page/Tv_Shows/Tv_Shows";

export const route = [
  {
    path: "/",
    element: Content,
  },
  {
    path: "/search",
    element: Search,
  },
  {
    path: "/login",
    element: LoginPage,
  },
  {
    path: "/movies",
    element: Movies,
  },
  {
    path: "/tv_shows",
    element: Tv_Shows,
  },
  {
    path: "/results",
    element: SearchResults,
  },
  {
    path: "/:media_type/:type",
    element: ViewMorePage,
  },
  {
    path: "/details/:media_type/:id",
    element: DetailsMovie,
  },
  {
    path: "/watch/tv/:id/season/:season/esp/:esp",
    element: WatchTv,
  },
  {
    path: "/watch/movie/:id",
    element: WatchMovie,
  },
];
