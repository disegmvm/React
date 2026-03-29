import { Link } from "react-router";
import styles from "./homePage.module.css";

export const HomePage = () => {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>Учебный проект на React</p>
      <h2 className={styles.title}>Добро пожаловать в каталог ресторанов</h2>
      <p className={styles.description}>
        Здесь можно открыть ресторан, посмотреть меню и отзывы, а потом перейти
        на отдельную страницу блюда и поработать с корзиной.
      </p>

      <div className={styles.actions}>
        <Link to="/restaurants" className={styles.primaryLink}>
          Открыть рестораны
        </Link>
      </div>
    </section>
  );
};
