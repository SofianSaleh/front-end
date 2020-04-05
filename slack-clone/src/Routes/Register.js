import React, { Component } from "react";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { graphql } from "@apollo/react-hoc";
import { Container, Input, Header, Button } from "semantic-ui-react";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  onChange(e) {
    console.log({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: this.state
      })
      .then(res => {
        console.log(res);
      });
  }

  render() {
    const { username, email, password } = this.state;
    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          name={"username"}
          onChange={this.onChange.bind(this)}
          value={username}
          placeholder={"Username"}
          fluid
        />
        <Input
          name={"email"}
          onChange={this.onChange.bind(this)}
          value={email}
          placeholder={"Email"}
          fluid
        />
        <Input
          name={"password"}
          onChange={this.onChange.bind(this)}
          value={password}
          type="password"
          placeholder={"Password"}
          fluid
        />
        <Button onClick={this.onSubmit.bind(this)} primary>
          Submit
        </Button>
      </Container>
    );
  }
}

const registerQuery = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      message
      success
    }
  }
`;

export default graphql(registerQuery)(Register);
