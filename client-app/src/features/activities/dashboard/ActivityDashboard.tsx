import React from 'react';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';

import { IActivity } from '../../../app/models/activity';

import { Grid } from 'semantic-ui-react';

interface IProps {
  activities: IActivity[],
  selectedActivity: IActivity,
  selectActivity: (id: string) => void
}

export const ActivityDashboard: React.FC<IProps> = ({activities, selectedActivity, selectActivity}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && <ActivityDetails activity={selectedActivity} />}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  )
}
