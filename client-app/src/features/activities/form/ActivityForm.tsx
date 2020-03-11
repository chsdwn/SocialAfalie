import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import { category } from "../../../app/common/options/CategoryOptions";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from "revalidate";

import { DateInput } from "../../../app/common/form/DateInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";
import { TextInput } from "../../../app/common/form/TextInput";

import { ActivityFormValues } from "../../../app/models/activity";

import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { combineDateAndTime } from "../../../app/common/util/util";

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters."
    })
  )(),
  category: isRequired("Category"),
  date: isRequired("Date"),
  time: isRequired("Time"),
  city: isRequired("City"),
  venue: isRequired("Venue")
});

interface DetailParams {
  id: string;
}

export const ActivityForm: React.FC<RouteComponentProps<
  DetailParams
>> = observer(({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity
  } = rootStore.activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then(activity => setActivity(new ActivityFormValues(activity)))
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;

    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  value={activity.description}
                  component={TextAreaInput}
                  rows="2"
                />
                <Field
                  name="category"
                  placeholder="Category"
                  value={activity.category}
                  component={SelectInput}
                  options={category}
                />
                <Form.Group widths="equal">
                  <Field
                    name="date"
                    date={true}
                    placeholder="Date"
                    value={activity.date}
                    component={DateInput}
                  />
                  <Field
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={activity.time}
                    component={DateInput}
                  />
                </Form.Group>
                <Field
                  name="city"
                  placeholder="City"
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  name="venue"
                  placeholder="Venue"
                  value={activity.venue}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                  disabled={loading || invalid || pristine}
                />
                <Button
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push("/activities")
                  }
                  floated="right"
                  type="button"
                  content="Cancel"
                  disabled={loading}
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
});
