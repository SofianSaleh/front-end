import React from "react";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";
import {
  Message,
  Form,
  Button,
  Input,
  Container,
  Header,
} from "semantic-ui-react";
import { gql } from "apollo-boost";
import { graphql } from "@apollo/react-hoc";

class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: "",
      password: "",
      errors: {},
    });
  }

  onSubmit = async () => {
    this.setState({ errors: {} });

    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password },
    });

    const { success, token, refreshToken, errors } = response.data.login;

    if (success) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.props.history.push("/");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const {
      email,
      password,
      errors: { EmailError, PasswordError },
    } = this;

    const errorList = [];

    if (EmailError) errorList.push(EmailError);

    if (PasswordError) errorList.push(PasswordError);

    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form>
          <Form.Field error={!!EmailError}>
            <Input
              name="email"
              onChange={this.onChange}
              value={email}
              placeholder="Email"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!PasswordError}>
            <Input
              name="password"
              onChange={this.onChange}
              value={password}
              type="password"
              placeholder="Password"
              fluid
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null}
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
