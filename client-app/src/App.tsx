import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  state = {
    values: []
  }

  componentDidMount() {
    this.setState({
      values: [
        { id: 1, name: 'Value 101' },
        { id: 2, name: 'Value 102' },
        { id: 3, name: 'Value 103' }
      ]
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
          {this.state.values.map((value: {id: number, name: string}) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
