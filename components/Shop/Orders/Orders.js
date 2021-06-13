import React from "react";
import styles from "./Orders.module.css";
import Order from "./Order/Order";
import { db } from "../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
const Orders = () => {
  const [orderList] = useCollection(
    db.collection("orders").orderBy("created", "desc")
  );
  return (
    <div className={styles.order}>
      <h1>Your Orders</h1>
      <div className={styles.order__orders}>
        {orderList &&
          orderList.docs.map((order) => {
            console.log(order.data());
            return <Order order={order.data()} />;
          })}
      </div>
    </div>
  );
};

export default Orders;
