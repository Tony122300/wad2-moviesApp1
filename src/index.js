import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/movieContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import popularMoviesPage from "./pages/popularMoviesPage";
import upcomingMoviesPage from "./pages/upcomingMoviesPage";
import LoginPage from "./pages/loginPage";
import AuthContext from "./contexts/authContext";
import PrivateRoute from "./components/privateRoute";
import SignUpPage from "./pages/signupPage";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthContext>
        <SiteHeader />
        <Link to="/signup">signupPage</Link>

        <MoviesContextProvider>
            {" "}
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
            <Route exact path="/reviews/form" component={AddMovieReviewPage} />
      <Route path="/reviews/:id" component={MovieReviewPage} />
        <PrivateRoute exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <Route path="/movies/:id" component={MoviePage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/movies/popular" component={popularMoviesPage} />
        <Route exact path="/movies/upcoming" component={upcomingMoviesPage} />
        <Redirect from="*" to="/" />
      </Switch>
      </MoviesContextProvider>
      </AuthContext>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));