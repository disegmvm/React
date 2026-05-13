import type { FC } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectCartSummary } from "../../redux/selectors";
import styles from "./cart.module.css";

export const Cart: FC = () => {
  const cart = useAppSelector(selectCartSummary);

  return (
    <aside className={styles.cart}>
      <div className={styles.header}>
        <h2 className={styles.title}>Корзина</h2>
        <span className={styles.badge}>{cart.totalItems}</span>
      </div>

      {cart.items.length === 0 ? (
        <p className={styles.empty}>Пока пусто. Добавь что-нибудь из меню.</p>
      ) : (
        <>
          <ul className={styles.list}>
            {cart.items.map((item) => (
              <li key={item.id} className={styles.item}>
                <div>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemMeta}>
                    {item.quantity} x {item.price}
                  </p>
                </div>
                <strong>{item.price * item.quantity}</strong>
              </li>
            ))}
          </ul>

          <p className={styles.total}>Итого: {cart.totalPrice}</p>
        </>
      )}
    </aside>
  );
};
