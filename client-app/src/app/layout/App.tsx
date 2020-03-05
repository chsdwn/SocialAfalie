import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';

import { IActivity } from '../models/activity';

import { Container } from 'semantic-ui-react';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)])
  };

  // Works as same as ComponentDidMount, runs once when component start
  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then(activities => {
      let activityList: IActivity[] = [];
      activities.data.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activityList.push(activity);
      });
      setActivities(activityList);
    });
  }, []); // prevents endless loop

  return (
    // just like 'ng-container'
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity!}
          selectActivity={handleSelectActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity} />
      </Container>
    </Fragment>
  );
}

export default App;
