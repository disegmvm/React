import { useEffect, useState } from "react";
import styles from "./scrollBar.module.css";

export const ScrollBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const result = (currentScroll / pageHeight) * 100;

      setWidth(result);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar} style={{ width: `${width}%` }} />
    </div>
  );
};