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

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: "",
      errors: {},
    });
  }

  onSubmit = async () => {
    this.setState({ errors: {} });
    let response;
    const { name } = this;
    try {
      response = await this.props.mutate({
        variables: { name },
      });
    } catch (err) {
      this.props.history.push("/");
      return;
    }

    const { success, errors, team } = response.data.createTeam;

    console.log(success);
    if (success) {
      this.props.history.push(`/view-team/${team.id}`);
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
      name,
      errors: { nameError },
    } = this;

    const errorList = [];

    if (nameError) errorList.push(nameError);

    return (
      <Container text>
        <Header as="h2">CreateTeam</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input
              name="name"
              onChange={this.onChange}
              value={name}
              placeholder="Team Name"
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

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      success
      team {
        id
        name
      }
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
