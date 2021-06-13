import React from "react";
import StarIcon from "@material-ui/icons/Star";
import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../../../../helpers/slices/cartSlice";
import { Rating } from "@material-ui/lab";

const CartItem = ({
  id,
  image,
  title,
  rating,
  price,
  hideButton,
  quantity,
  details,
}) => {
  const dispatch = useDispatch();
  // const [{ user }, dispatch] = useStateValue();
  const removeCart = () => {
    dispatch(
      removeFromCart({
        id: id,
      })
    );
  };
  const addCart = () => {
    dispatch(
      addToCart({
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        quantity: 1,
      })
    );
  };
  const checkout__cart = {
    marginTop: "20px",
    display: "flex",
    fontSize: "18px",
    borderBottom: "1px solid lightgray",
    marginBottom: "20px",
    fontWeight: "600",
  };
  const checkout__cartInfo = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  };

  return (
    <div className={styles.checkout__cart} style={checkout__cart}>
      <img src={image} alt="" className={styles.checkout__cartImage}></img>
      <div className={styles.checkout__cartInfo} style={checkout__cartInfo}>
        <p>{title}</p>
        <p>
          <small>
            <strong>{String.fromCharCode(8377)}</strong>
          </small>
          <strong>{`${price} * ${quantity}`}</strong>
        </p>
        <p>
          <Rating value={rating} readOnly />
        </p>
        {hideButton && (
          <div>
            <button
              className={styles.checkout__cartButton}
              onClick={removeCart}
            >
              Remove from Cart
            </button>
            <button className={styles.checkout__cartButton} onClick={addCart}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
