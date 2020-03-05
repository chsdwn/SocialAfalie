import React, { useState, FormEvent } from "react";
import { IActivity } from "../../../app/models/activity";

import { Segment, Form, Button } from "semantic-ui-react";

interface IProps {
  activity: IActivity;
  setEditMode: (editMode: boolean) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
  activity: initialFormState,
  setEditMode,
  createActivity,
  editActivity
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // event.currentTarget.name, event.currentTarget.value
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if(activity.id.length === 0) {
      createActivity(activity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          placeholder="Description"
          rows={2}
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          placeholder="Date"
          type="datetime-local"
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
