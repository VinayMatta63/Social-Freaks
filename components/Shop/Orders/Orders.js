import React from "react";
import Order from "./Order/Order";
import { db } from "../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { useSession } from "next-auth/client";

const Orders = () => {
  const [session] = useSession();
  const [orderList] = useCollection(
    db.collection("orders").orderBy("created", "desc")
  );
  return (
    <Container>
      <Head>Your Orders</Head>
      <div>
        {orderList &&
          orderList.docs
            .filter((order) => order.email === session.user.email)
            .map((order) => {
              // console.log(order.data());
              return <Order id={order.id} order={order.data()} />;
            })}
      </div>
    </Container>
  );
};

export default Orders;

const Container = styled.div`
  padding: 20px 80px;
  @media (max-width: 769px) {
    padding: 0;
  }
`;
const Head = styled.h1`
  margin: 30px 0;
`;
