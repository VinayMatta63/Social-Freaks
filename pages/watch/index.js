import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import Head from "next/head";
import styled from "styled-components";
// import Header from "../../components/Header/Header";
// import Login from "../../components/Login";
// import HomeScreen from "../../components/Watch/HomeScreen/HomeScreen";
import axios from "../../helpers/axios";
import requests from "../../helpers/Request";
import setUser from "../../helpers/setUser";
const HomeScreen = dynamic(
  () => import("../../components/Watch/HomeScreen/HomeScreen"),
  {
    ssr: false,
  }
);
const Login = dynamic(() => import("../../components/Login"), {
  ssr: false,
});
const Header = dynamic(() => import("../../components/Header/Header"), {
  ssr: false,
});

export default function Watch({ topRated }) {
  const [session] = useSession();
  if (!session) {
    return <Login />;
  } else {
    setUser(session);
  }

  return (
    <Container>
      <Head>
        <title>Movie Freaks</title>
        <meta name="description" content="Trailer Playing platform for Geeks" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dpnapmmwm/image/upload/v1622458967/Others/Social_Freaks-logos--_ljd13h.jpg"
        />
      </Head>
      <Header />
      <Main>
        <HomeScreen topRated={topRated} />
      </Main>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const request = await axios.get(requests.fetchTopRated);
  const topRated = request.data.results;
  return { props: { topRated } };
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
