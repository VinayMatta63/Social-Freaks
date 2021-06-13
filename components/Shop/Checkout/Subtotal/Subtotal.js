import React from "react";
import styles from "./Subtotal.module.css";
import CurrencyFormat from "react-currency-format";
// import { useStateValue } from "../../StateProvider";
import { cartSum, cartTotal } from "../../../../helpers/slices/cartSlice";
// import { useHistory } from "react-router-dom";
import { selectItems } from "../../../../helpers/slices/cartSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Subtotal = () => {
  // const [{ cart }] = useStateValue();
  const cart = useSelector(selectItems);
  const history = useRouter();
  const proceedToPay = () => {
    if (cart.length > 0) {
      history.push("/payment");
    } else {
      alert("Cart is Empty");
    }
  };
  return (
    <div className={styles.subtotal}>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({cartSum(cart)} items):
              <strong style={{ marginLeft: "10px" }}>{value}</strong>
            </p>
            <small className={styles.subtotal__gift}>
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={cartTotal(cart)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={String.fromCharCode(8377)}
      />
      <button onClick={proceedToPay}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
