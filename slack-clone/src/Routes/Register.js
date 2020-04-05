import React, { Component } from "react";

import { gql } from "apollo-boost";
import { graphql } from "@apollo/react-hoc";
import { Message, Container, Input, Header, Button } from "semantic-ui-react";

class Register extends Component {
  state = {
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: ""
    });
    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password }
    });
    const { success, errors } = response.data.register;
    if (success) {
      this.props.history.push("/");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  };

  render() {
    const {
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError
    } = this.state;

    const errorsList = [];
    if (usernameError) errorsList.push(usernameError);
    if (emailError) errorsList.push(emailError);
    if (passwordError) errorsList.push(passwordError);

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          error={usernameError}
          name={"username"}
          onChange={this.onChange.bind(this)}
          value={username}
          placeholder={"Username"}
          fluid
        />
        <Input
          error={emailError}
          name={"email"}
          onChange={this.onChange.bind(this)}
          value={email}
          placeholder={"Email"}
          fluid
        />
        <Input
          error={passwordError}
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
        {usernameError || emailError || passwordError ? (
          <Message
            error
            header="There was some errors in your submission"
            list={errorsList}
          />
        ) : null}
      </Container>
    );
  }
}

const registerQuery = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      success
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerQuery)(Register);
