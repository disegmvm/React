import classNames from "classnames";
import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";
import { Cart } from "../cart/cart";
import { ScrollBar } from "../scrollBar/scrollBar";
import { useTheme } from "../themeContext/themeContext";
import { useUser } from "../userContext/userContext";
import styles from "./layout.module.css";

export const Layout = ({ children }: PropsWithChildren) => {
  const { theme, toggleTheme } = useTheme();
  const { userName, isAuthorized, login, logout } = useUser();

  return (
    <div
      className={classNames(styles.layout, {
        [styles.lightTheme]: theme === "light",
        [styles.darkTheme]: theme === "dark",
      })}
    >
      <ScrollBar />

      <header className={styles.header}>
        <div className={styles.brand}>
          <h1 className={styles.title}>Рестораны</h1>

          <nav className={styles.nav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/restaurants"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
              }
            >
              Restaurants
            </NavLink>
          </nav>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.headerButton}
            onClick={toggleTheme}
          >
            Сменить тему
          </button>

          {isAuthorized ? (
            <>
              <span className={styles.greeting}>Привет, {userName}!</span>
              
              <button
                type="button"
                className={styles.headerButton}
                onClick={logout}
              >
                Выйти
              </button>
            </>
          ) : (
            <button
              type="button"
              className={styles.headerButton}
              onClick={login}
            >
              Войти
            </button>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.pageContent}>{children}</div>
          <Cart />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Домашка по React</p>
      </footer>
    </div>
  );
};
