import type { ReactNode } from "react";
import { ScrollBar } from "../scrollBar/scrollBar";
import styles from "./layout.module.css";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <ScrollBar />

      <header className={styles.header}>
        <h1 className={styles.title}>Рестораны</h1>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>Домашка по React</p>
      </footer>
    </div>
  );
};