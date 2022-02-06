import React, { useEffect, useState } from "react";

import axios from "../api/axios";
import requests from "../api/requests";
import styled from "styled-components";

const BannerCss = styled.header`
  color: white;
  object-fit: contain;
  height: 448px;
`;

const BannerContents = styled.div`
  margin-left: 30px;
  padding-top: 140px;
  height: 190px;
`;

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
`;

const BannerDescription = styled.h1`
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 0.8rem;
  max-width: 360px;
  height: 80px;
`;

const BannerButton = styled.button`
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);
  &:hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
  }
`;

const BannerFadeBotton = styled.div`
  height: 7.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
`;

const Banner = () => {
  const [movie, setMovie]: [movie: any, setMovie: (x: any) => void] =
    useState();

  //async 차이?
  //movies 중에 하나 랜덤 뽑기
  useEffect(() => {
    axios
      .get(requests.fetchNetflixOriginals)
      .then(function (response) {
        let randomMovie =
          response.data.results[
            Math.floor(Math.random() * response.data.results.length - 1)
          ];
        // while (randomMovie!) {
        //   randomMovie =
        //     request.data.results[
        //       Math.floor(Math.random() * request.data.results.length - 1)
        //     ];
        // }
        setMovie(randomMovie);
        console.log("banner성공");
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(movie);

  // 설명 길면 말줄임표
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <BannerCss
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
      }}
    >
      <BannerContents>
        <BannerTitle>
          {movie?.title || movie?.name || movie?.original_name}
        </BannerTitle>

        <div>
          <BannerButton>Play</BannerButton>
          <BannerButton>My List</BannerButton>
        </div>

        <BannerDescription>{truncate(movie?.overview, 150)}</BannerDescription>
      </BannerContents>

      <BannerFadeBotton />
    </BannerCss>
  );
};

export default Banner;
