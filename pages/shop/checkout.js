import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import Head from "next/head";
import styled from "styled-components";
// import Header from "../../components/Header/Header";
// import Login from "../../components/Login";
// import Checkout from "../../components/Shop/Checkout";
const Checkout = dynamic(() => import("../../components/Shop/Checkout"), {
  ssr: false,
});
const Login = dynamic(() => import("../../components/Login"), {
  ssr: false,
});
const Header = dynamic(() => import("../../components/Header/Header"), {
  ssr: false,
});
export default function CheckoutPage() {
  const [session] = useSession();
  if (!session) {
    return <Login />;
  }

  return (
    <Container>
      <Head>
        <title>Freaks Shop</title>
        <meta name="description" content="Shopping platform for Geeks" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dpnapmmwm/image/upload/v1622458967/Others/Social_Freaks-logos--_ljd13h.jpg"
        />
      </Head>
      <Header />
      <Main>
        <Checkout />
      </Main>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
`;
