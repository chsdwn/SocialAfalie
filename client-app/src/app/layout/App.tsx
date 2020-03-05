import React, { Component } from 'react';
import axios from 'axios';

import { IActivity } from '../models/activity';

import { Header, Icon, List } from 'semantic-ui-react';

interface IState {
  activities: IActivity[]
}

class App extends Component {
  readonly state: IState = {
    activities: []
  };

  componentDidMount() {
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then(activities => {
      this.setState({
        activities: activities.data
      });
    });
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Social Afalie</Header.Content>
        </Header>
        <List>
          {this.state.activities.map(activity => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
