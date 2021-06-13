import React from "react";
import Banner from "../Banner/Banner";
import requests from "../../../helpers/Request";
import Row from "../Row/Row";
import styled from "styled-components";
import Image from "next/image";

const HomeScreen = ({ topRated }) => {
  return (
    <Container>
      <Banner topRated={topRated} />

      <Row title="Trending Now" fetch_url={requests.fetchTrending} isLargeRow />
      <Row title="Action Movies" fetch_url={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetch_url={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetch_url={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetch_url={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetch_url={requests.fetchDocumentaries} />
      <Row title="Thriller Movies" fetch_url={requests.fetchThriller} />
      <Row title="Unique Movies" fetch_url={requests.fetchOthers} />
      <Row title="Other Hits" fetch_url={requests.fetchRest} />

      <Credits>
        <Src>Source:-</Src>
        <Img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt="tmdb"
          height={150}
          width={150}
          // objectFit="contain"
          layout="fixed"
        />
      </Credits>
    </Container>
  );
};

export default HomeScreen;

const Container = styled.div`
  overflow: hidden;
`;
const Credits = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  align-items: center;
`;

const Src = styled.p`
  color: green;
  margin-bottom: 20px;
  font-size: 30px;
  margin-top: 20px;
`;

const Img = styled(Image)`
  margin-bottom: 20px;
`;
