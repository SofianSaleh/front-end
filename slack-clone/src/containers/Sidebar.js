import React from "react";

import { gql } from "apollo-boost";
import { graphql } from "@apollo/react-hoc";

import Channels from "../components/Channels";
import Teams from "../components/Teams";

import _ from "lodash";
import decode from "jwt-decode";

const Sidebar = ({ data: { loading, allTeams }, currentTeamId }) => {
  if (loading) {
    return null;
  }
  console.log(allTeams);
  const teamIdx = currentTeamId
    ? _.findIndex(allTeams, ["id", parseInt(currentTeamId, 10)])
    : 0;
  const team = allTeams[teamIdx];
  let username = "";

  try {
    const token = localStorage.getItem("token");
    const { user } = decode(token);
    username = user.username;
  } catch (err) {}

  return [
    <Teams
      key="team-sidebar"
      teams={allTeams.map((t) => ({
        id: t.id,
        name: t.name.charAt(0).toUpperCase(),
      }))}
    />,
    <Channels
      key="channels-sidebar"
      teamName={team.name}
      username={username}
      channels={team.channels}
      users={[
        { id: 1, name: "slackbot" },
        { id: 2, name: "user1" },
      ]}
    />,
  ];
};

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default graphql(allTeamsQuery)(Sidebar);
