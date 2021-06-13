import React from "react";
import Link from "next/link";
import styles from "./Thanks.module.css";

const Thanks = () => {
  return (
    <div className={styles.thanks}>
      <h1 className={styles.thanks__head}>Thank you for Ordering.</h1>
      <img
        className={styles.thanks__logo}
        src="https://image.flaticon.com/icons/png/512/487/487932.png"
        alt=""
      ></img>
      <Link href="/shop/orders">
        <button className={styles.thanks__button}>View Orders</button>
      </Link>
    </div>
  );
};

export default Thanks;
