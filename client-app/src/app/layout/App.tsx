import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { IActivity } from '../models/activity';

import { Header, Icon, List } from 'semantic-ui-react';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  // Works as same as ComponentDidMount, runs once when component start
  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then(activities => {
      setActivities(activities.data);
    });
  }, []); // prevents endless loop

  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Social Afalie</Header.Content>
      </Header>
      <List>
        {activities.map(activity => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
