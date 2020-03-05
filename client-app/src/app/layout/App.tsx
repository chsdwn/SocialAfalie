import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';

import { IActivity } from '../models/activity';

import { Header, Icon, List, Container } from 'semantic-ui-react';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  // Works as same as ComponentDidMount, runs once when component start
  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then(activities => {
      setActivities(activities.data);
    });
  }, []); // prevents endless loop

  return (
    // just like 'ng-container'
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  );
}

export default App;
