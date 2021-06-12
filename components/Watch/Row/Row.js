import axios from "../../../helpers/axios";
import React, { useEffect, useState } from "react";
import movieTrailer from "movie-trailer";
import styled from "styled-components";

const baseURL = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetch_url, isLargeRow = false }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movies, setMovies] = useState([]);

  const clickHandle = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.name ||
          movie?.title ||
          movie?.original_name ||
          movie?.original_title,
        {
          id: true,
        }
      )
        .then((url) => {
          setTrailerUrl(url);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  };
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetch_url);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetch_url]);

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "..." : string;

  return (
    <Container>
      <h2>{title}</h2>
      <Images>
        {movies?.map(
          (movie, index) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <Frenzy key={index}>
                <Img
                  src={`${baseURL}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  key={movie.id}
                  onClick={() => clickHandle(movie)}
                  isLargeRow={isLargeRow}
                />
                <FrenzyText>
                  {isLargeRow
                    ? truncate(movie.name || movie.title, 20)
                    : truncate(movie.name || movie.title, 25)}
                </FrenzyText>
              </Frenzy>
            )
        )}
      </Images>
      {trailerUrl && (
        <iframe
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${trailerUrl}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      )}
    </Container>
  );
};

export default Row;
const Container = styled.div`
  color: #3fb497;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const Images = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Frenzy = styled.div``;
const FrenzyText = styled.span`
  margin-left: 10px;
  font-size: 14px;
  display: block;
`;

const Img = styled.img`
  border-radius: 15px;
  max-height: 150px;
  object-fit: contain;
  margin-right: 10px;
  transition: transform 250ms;
  margin-bottom: -30px;
  :hover {
    transform: scale(1.1);
    opacity: 1;
  }
  ${(props) => props.isLargeRow && "max-height: 250px;"}
`;
