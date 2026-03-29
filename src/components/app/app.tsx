import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Layout } from "../layout/layout";
import { NotFound } from "../notFound/notFound";
import { ThemeProvider } from "../themeContext/themeContext";
import { UserProvider } from "../userContext/userContext";
import { DishPage } from "../../pages/dishPage/dishPage";
import { HomePage } from "../../pages/homePage/homePage";
import { MenuPage } from "../../pages/menuPage/menuPage";
import { RestaurantIndexRedirect, RestaurantPage } from "../../pages/restaurantPage/restaurantPage";
import { RestaurantsIndexRedirect, RestaurantsPage } from "../../pages/restaurantsPage/restaurantsPage";
import { ReviewsPage } from "../../pages/reviewsPage/reviewsPage";
import styles from "./app.module.css";

export const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <Layout>
            <div className={styles.app}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/restaurants" element={<RestaurantsPage />}>
                  <Route index element={<RestaurantsIndexRedirect />} />
                  <Route path=":restaurantId" element={<RestaurantPage />}>
                    <Route index element={<RestaurantIndexRedirect />} />
                    <Route path="menu" element={<MenuPage />} />
                    <Route path="reviews" element={<ReviewsPage />} />
                  </Route>
                </Route>
                <Route path="/dish/:dishId" element={<DishPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Layout>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  </Provider>
);
