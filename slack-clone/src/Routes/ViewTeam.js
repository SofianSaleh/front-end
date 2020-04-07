import React from "react";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import Header from "../components/Header";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";
import AppLayout from "../components/AppLayout";

export default () => (
  <AppLayout>
    <Teams
      teams={[
        { id: 1, name: "B" },
        { id: 2, name: "R" },
        { id: 3, name: "S" },
      ]}
    />
    <Channels
      teamName="One"
      username="Sofian"
      username="Sofian"
      channels={[
        { id: 1, name: "Genral" },
        { id: 2, name: "Genral 1" },
      ]}
      users={[
        { id: 1, name: "Sofian" },
        { id: 2, name: "Ahmed" },
      ]}
    />
    <Header channelName="genral" />
    <Messages>
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <SendMessage channelname="general" />>
  </AppLayout>
);
