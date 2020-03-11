import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";

import { ActivityList } from "./ActivityList";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

import { Grid } from "semantic-ui-react";

export const ActivityDashboard = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const {loadActivities, loadingInitial} = rootStore.activityStore;

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial)
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
