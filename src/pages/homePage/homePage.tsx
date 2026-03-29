import { Link } from "react-router";
import styles from "./homePage.module.css";

export const HomePage = () => {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>Учебный проект на React</p>
      <h2 className={styles.title}>Добро пожаловать в рестики</h2>
      <p className={styles.description}>
        Здесь можно открыть рестики, посмотреть менюшки и отзывы, а подобавлять блюда в корзину.
      </p>

      <div className={styles.actions}>
        <Link to="/restaurants" className={styles.primaryLink}>
          Открыть рестики
        </Link>
      </div>
    </section>
  );
};
