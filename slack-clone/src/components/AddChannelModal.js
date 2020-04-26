import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import { gql } from "apollo-boost";
import { graphql } from "@apollo/react-hoc";

import { withFormik } from "formik";

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  isSubmitting,
  handleSubmit,
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            fluid
            placeholder="Channel name"
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Button disabled={isSubmitting} fluid onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} onClick={handleSubmit} fluid>
            Create Channel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name)
  }
`;

export default graphql(createChannelMutation)(
  withFormik({
    mapPropsToValues: () => ({ name: "" }),
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting }
    ) => {
      const response = await mutate({
        variables: { teamId: parseInt(teamId), name: values.name },
      });
      console.log(response);
      onClose();
      setSubmitting(false);
    },
  })(AddChannelModal)
);
