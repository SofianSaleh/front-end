import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const Home = () => {
  const { loading, error, data } = useQuery(allUsers);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.getAllUsers.map((user) => (
    <div>
      <h1 key={user.id}>{user.username}</h1>
    </div>
  ));
};

const allUsers = gql`
  {
    getAllUsers {
      username
    }
  }
`;

export default Home;
