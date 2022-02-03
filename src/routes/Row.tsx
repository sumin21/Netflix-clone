import React, { useEffect, useState } from "react";

import YouTube from "react-youtube";
import axios from "../api/axios";
import movieTrailer from "movie-trailer";
import styled from "styled-components";

const base_url = "https://image.tmdb.org/t/p/original/";

const RowMargin = styled.div`
  margin-left: 20px;
`;

const Title = styled.h2`
  color: white;
`;

const RowPosters = styled.div`
  display: flex;
  overflow-y: hidden; /* 화면을 넘어갈 경우 세로 스크롤 할지 말지 */
  overflow-x: scroll; /* 화면을 넘어갈 경우 가로 스크롤 할지 말지 */
  padding: 20px;
  &::-webkit-scrollbar {
    display: none; /* 스크롤 노출 유무 (작동엔 영향 없음) */
  }
`;

const RowPoster = styled.img<{ active?: boolean }>`
  object-fit: contain;
  width: 100%;
  margin-right: 10px;
  transition: transform 450ms;
  max-height: ${(props) => (props.active ? "250px" : "100px")};
  &:hover {
    transform: ${(props) => (props.active ? "scale(1.09)" : "scale(1.08)")};
  }
`;

type MoviesProps = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

interface Movies {
  adult?: boolean;
  first_air_date?: string;
  name?: string;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  media_type?: string;
  original_name?: string;
  origin_country?: Array<string>;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

const Row = ({ title, fetchUrl, isLargeRow }: MoviesProps) => {
  const [movies, setMovies]: [movies: any, setMovies: any] = useState([]);
  const [trailerUrl, setTrailerUrl]: [trailerUrl: any, setTrailerUrl: any] =
    useState("");

  // A snippet of code which runs based on a specific condition/varaible
  useEffect(() => {
    // if [], run once when the row loads, and dont run again

    axios
      .get(fetchUrl)
      .then(function (response) {
        setMovies(response.data.results);
        console.log("성공");
      })
      .catch(function (error) {
        console.log("실패");
      });
  }, [fetchUrl]);
  // [fetchUrl]은 useEffect에게 block 밖에 있는 variable를 쓰고있다고 알려주는것

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie: any) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url: any) => {
          // https://www.youtube.com/watch?v=XtMThy8QKqU
          // ?뒤에 부분 pass해서 어떻게 한다는 듯. XtMThy8QKqU 이 부분은 video ID
          // https://www.youtube.com/watch?v=XtMThy8QKqU&banana=5
          // urlParams.get('banana'); 하면 5라는 value를 줌. 고로 'v' 하면 video ID 부분 반환
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error: any) => console.log(error)); //맞는 영상 없으면 error 송출
    }
  };

  return (
    <RowMargin>
      <Title>{title}</Title>

      <RowPosters>
        {movies.map((movie: Movies) => (
          <RowPoster
            active={isLargeRow}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </RowPosters>
    </RowMargin>
  );
};

export default Row;
