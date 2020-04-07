import React from "react";

import styled from "styled-components";

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`;

const team = ({ id, name }) => <li key={`user-${id}`}>{name}</li>;

export default ({ teams }) => {
  return (
    <TeamWrapper>
      <div>
        <ul>{teams.map(team)}</ul>
      </div>
    </TeamWrapper>
  );
};
