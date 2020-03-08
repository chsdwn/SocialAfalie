import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import ActivityStore from "./../../../app/stores/activityStore";

import { ActivityDetailedHeader } from "./ActivityDetailedHeader";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedChat } from "./ActivityDetailedChat";
import { ActivityDetailedSidebar } from "./ActivityDetailedSidebar";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

import { Grid } from "semantic-ui-react";

interface DetailParams {
  id: string;
}

export const ActivityDetails: React.FC<RouteComponentProps<
  DetailParams
>> = observer(({ match }) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity) {
    return <LoadingComponent content="Loading activity" />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
});
