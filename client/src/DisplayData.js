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
    }
  }
`;

function DisplayData() {
  // useQuery will make request
  const { data } = useQuery(QUERY_ALL_USERS);

  if (data) {
    console.log(data);
  }

  return <div></div>;
}

export default DisplayData;
