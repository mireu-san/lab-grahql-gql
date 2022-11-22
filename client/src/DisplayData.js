import React, { useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

// And here for Apollo, as I did on browser side
const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllUsers {
    movies {
      name
    }
  }
`;

// caution here : Stop overthinking here
const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

function DisplayData() {
  //   specific data to query it
  const [movieSearched, setMovieSearched] = useState("");

  // useQuery will make request
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  //   specific data to query it
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <h1> 데이터가 로드 중 입니다. 메시지 출력중...</h1>;
  }

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
  }

  return (
    <div>
      {/* Users */}
      {/* if data is available, then map the data */}
      {data &&
        // data.map((user) => {
        data.users.map((user) => {
          return (
            <div>
              <h1>이름: {user.name}</h1>
              <h1>유저이름: {user.username}</h1>
              <h1>나이: {user.age}</h1>
              <h1>국적: {user.nationality}</h1>
            </div>
          );
        })}

      {/* Movies */}
      {movieData &&
        movieData.movies.map((movie) => {
          return <h1>이름: {movie.name}</h1>;
        })}

      {/* query specific single data only */}
      <div>
        <input
          type="text"
          placeholder="Interstellar"
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        />
        <button
          // this is bit tricky! - part of querying specific single data
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });
          }}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>영화이름: {movieSearchedData.movie.name}</h1>
              <h1>영화년도: {movieSearchedData.movie.yearOfPublication}</h1>
            </div>
          )}
          {movieError && <h1> Error occurred : unable to fetch the data</h1>}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
