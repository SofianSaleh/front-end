import React, { Component } from "react";

import { gql } from "apollo-boost";
import { graphql } from "@apollo/react-hoc";
import {
  Form,
  Message,
  Container,
  Input,
  Header,
  Button,
} from "semantic-ui-react";

class Register extends Component {
  state = {
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: "",
    });
    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password },
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
      passwordError,
    } = this.state;

    const errorsList = [];
    if (usernameError) errorsList.push(usernameError);
    if (emailError) errorsList.push(emailError);
    if (passwordError) errorsList.push(passwordError);

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Form>
          <Form.Field error={!!usernameError}>
            <Input
              name={"username"}
              onChange={this.onChange.bind(this)}
              value={username}
              placeholder={"Username"}
              fluid
            />
          </Form.Field>
          <Form.Field error={!!emailError}>
            <Input
              name={"email"}
              onChange={this.onChange.bind(this)}
              value={email}
              placeholder={"Email"}
              fluid
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input
              name={"password"}
              onChange={this.onChange.bind(this)}
              value={password}
              type="password"
              placeholder={"Password"}
              fluid
            />
          </Form.Field>

          <Button onClick={this.onSubmit.bind(this)} primary>
            Submit
          </Button>
        </Form>
        {errorsList.length ? (
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
