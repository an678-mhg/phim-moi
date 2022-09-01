import Content from "./pages/Home/Home";
import ViewMorePage from "./pages/ViewMore/ViewMorePage";
import DetailsMovie from "./pages/Details/Details";
import Search from "./pages/Search/Search";
import SearchResults from "./pages/Search/SearchResults";
import WatchTv from "./pages/Watch/Watch";
import WatchMovie from "./pages/Watch/WatchMovie";
import LoginPage from "./pages/LoginPage/LoginPage";

export const routes = [
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
