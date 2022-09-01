import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import ErrorPage from "./pages/404/404Page";
import Footer from "./components/Footer/Footer";
import { routes } from "./route";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { useStore } from "./stored";
import { fetchMovieFavorite } from "./actions/fireStoreActions";
import PrivateRoute from "./components/Shared/PrivateRoute";
import FavoriteList from "./pages/FavoriteList/FavoriteList";
import Loading from "./components/Loading/Loading";

function App() {
  const { setUser, setFavoriteList, user } = useStore((state) => state);

  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const newFavoriteList = await fetchMovieFavorite(user.uid);
        setFavoriteList(newFavoriteList);
        return;
      }

      setUser(null);
      setFavoriteList([]);

      return () => {
        unsub();
      };
    });
  }, [setFavoriteList, setUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search, location.pathname]);

  if (typeof user === "undefined") {
    return <Loading />;
  }

  return (
    <>
      <div className="App">
        <Header />

        <Routes>
          {routes.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
          <Route
            path="/favorite-movie"
            element={
              <PrivateRoute>
                <FavoriteList />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
