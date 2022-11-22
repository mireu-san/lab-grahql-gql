import React from "react";
import { useQuery, gql } from "@apollo/client";

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

function DisplayData() {
  // useQuery will make request
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

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
    </div>
  );
}

export default DisplayData;
