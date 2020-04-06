import React from "react";

import { extendObservable } from "mobx";
import { observer } from "mobx-react";

import { gql } from "apollo-boost";
import { graphql } from "@apollo/react-hoc";

import { Form, Button, Input, Container, Header } from "semantic-ui-react";

class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: "",
      password: "",
    });
  }

  onSubmit = async (e) => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password },
    });
    const { success, token, refreshToken } = response.data.login;
    if (success) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const { email, password } = this;

    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Input
          name="email"
          onChange={this.onChange}
          value={email}
          placeholder="Email"
          fluid
        />
        <Input
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="Password"
          fluid
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
