import classNames from "classnames";
import type { ReactNode } from "react";
import { ScrollBar } from "../scrollBar/scrollBar";
import { useTheme } from "../themeContext/themeContext";
import { useUser } from "../userContext/userContext";
import styles from "./layout.module.css";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
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
        <h1 className={styles.title}>Рестораны</h1>

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

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>Домашка по React</p>
      </footer>
    </div>
  );
};