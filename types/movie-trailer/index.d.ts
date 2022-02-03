//@types/movie-trailer가 없기 때문에 직접 type 생성

declare module "movie-trailer" {
  //   export type movieTrailer = React.FC;
  interface movieTrailer {
    movieTrailer(x: any): any;
  }
  // 이곳에 method, property interface를 명명합니다.
  import express = require("express");

  function movieTrailer(): express.RequestHandler;

  export default flash;
}
