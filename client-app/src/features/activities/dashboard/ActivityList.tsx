import React, { useContext, Fragment } from "react";
import { observer } from "mobx-react-lite";
import ActivityStore from "./../../../app/stores/activityStore";

import { ActivityListItem } from "./ActivityListItem";

import { Item, Segment, Label } from "semantic-ui-react";

export const ActivityList = observer(() => {
  const activityStore = useContext(ActivityStore);

  return (
    <Fragment>
      {activityStore.activitiesByDate.map(([group, activities]) => (
        <Fragment>
          <Label key={group} size="large" color="blue">
            {group}
          </Label>
          <Segment clearing>
            <Item.Group divided>
              {activities.map(activity => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </Fragment>
  );
});
