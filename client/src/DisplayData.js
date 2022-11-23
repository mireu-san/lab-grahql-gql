import React, { useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

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

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

function DisplayData() {
  //   specific data to query it
  const [movieSearched, setMovieSearched] = useState("");

  // Create User States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  // useQuery will make request
  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  //   to query specific data
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) {
    return <h1> 데이터가 로드 중 입니다. 메시지 출력중...</h1>;
  }

  // if (data) {
  //   console.log(data);
  // }

  // if (error) {
  //   console.log(error);
  // }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(event) => {
            // setNationality(event.target.value);
            // .toUpperCase = due to type-defs's data values = capital letter (remember, client will input value)
            setNationality(event.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              // note, key : value, but in object in JS, { input: { name: name } }, can be input as below
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });
            // to fetch - create user, client side
            refetch();
          }}
        >
          Create User
        </button>
      </div>
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
