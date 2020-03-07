import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import ActivityStore from './../../../app/stores/activityStore';

import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

import { Grid } from "semantic-ui-react";

export const ActivityDashboard = observer(() => {
  const activityStore = useContext(ActivityStore);
  const {editMode, activity} = activityStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
});
