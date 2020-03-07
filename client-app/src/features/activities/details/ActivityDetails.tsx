import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import ActivityStore from "./../../../app/stores/activityStore";

import { LoadingComponent } from "../../../app/layout/LoadingComponent";

import { Card, Image, Button } from "semantic-ui-react";

interface DetailParams {
  id: string;
}

export const ActivityDetails: React.FC<RouteComponentProps<
  DetailParams
>> = observer(({ match, history }) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity,
    openEditForm,
    cancelSelectedActivity,
    loadActivity,
    loadingInitial
  } = activityStore;

  useEffect(() => {
    console.log(match.params.id);
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity) {
    return <LoadingComponent content="Loading activity" />;
  }

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/activities')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
