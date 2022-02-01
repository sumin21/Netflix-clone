import "./Row.css";

import React, { useEffect, useState } from "react";

import axios from "../api/axios";

const base_url = "https://image.tmdb.org/t/p/original/";

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

  return (
    <div className="row">
      <h2 className="title">{title}</h2>

      <div className="row__posters">
        {movies.map((movie: Movies) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
