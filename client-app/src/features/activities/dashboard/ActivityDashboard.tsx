import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";

import { ActivityList } from "./ActivityList";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

import { Grid } from "semantic-ui-react";

export const ActivityDashboard = observer(() => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading acitivies." />;

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
