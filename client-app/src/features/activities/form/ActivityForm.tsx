import React from 'react';

import { Segment, Form } from 'semantic-ui-react';

export const ActivityForm = () => {
  return (
    <Segment>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea placeholder="Description" rows={2} />
        <Form.Input placeholder="Category" />
        <Form.Input placeholder="Date" type="date" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Venue" />
      </Form>
    </Segment>
  )
}
