import { Rating } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Banner = ({ topRated }) => {
  const [movie, setMovie] = useState([]);
  const [value, setValue] = useState(0);
  useEffect(() => {
    setMovie(topRated[Math.floor(Math.random() * topRated.length - 1)]);
  }, []);
  useEffect(() => {
    setValue(movie?.vote_average);
  }, [movie]);

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "..." : string;
  return (
    <Header
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${
          `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}` ||
          "https://i.imgur.com/e1hLQ2m.png"
        })`,
        backgroundPosition: "center",
        backgroundPositionY: "20%",
        width: "100vw",
      }}
    >
      <BackFade>
        <Contents>
          <Featured>FEATURED FILM FOR TODAY</Featured>
          <Title>{movie?.name || movie?.title || "Netflix"}</Title>
          {movie?.first_air_date && (
            <Date>({movie?.first_air_date.slice(0, 4)})</Date>
          )}

          <Desc>
            {truncate(movie?.overview || "Home of all the excitement", 150)}
          </Desc>
          <Featured>
            <Stars>
              <Rating name="read-only" value={value} readOnly max={10} />
            </Stars>

            <Extra>{movie?.vote_average}</Extra>
            <Extra>({movie?.vote_count})</Extra>
          </Featured>
        </Contents>
      </BackFade>
      <Bottom />
    </Header>
  );
};

export default Banner;
const Header = styled.div`
  height: 488px;
  position: relative;
  object-fit: contain;
  color: white;
  margin-bottom: 20px;
  background-blend-mode: multiply;
`;

const BackFade = styled.div`
  height: 488px;
  background-image: radial-gradient(
    farthest-corner at 0 50%,
    #433520cb,
    #0259554b
  );
`;
const Stars = styled.span`
  font-size: 25px;
  word-spacing: 4px;
`;
const Contents = styled.div`
  margin-left: 30px;
  padding-top: 140px;
  height: 230px;
  @media (max-width: 767px) {
    margin-left: 10px;
  }
`;

const Featured = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
`;

const Title = styled.div`
  display: inline;
  font-size: 1.9rem;
  font-weight: 700;
  padding-bottom: 0.25rem;
`;
const Date = styled.span`
  font-weight: 600;
  color: rgba(255, 255, 255, 0.733);
`;

const Desc = styled.h1`
  width: 45rem;
  line-height: 1.2;
  padding-top: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.774);
  font-size: 0.8rem;
  max-width: 360px;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    max-width: 300px;
  }
`;
const Bottom = styled.div`
  margin-top: -7px;
  height: 1rem;
  background-image: linear-gradient(to right, #433520c7, #025955a4);
`;
const Extra = styled.span`
  margin-left: 10px;
  font-size: 13px;
`;
