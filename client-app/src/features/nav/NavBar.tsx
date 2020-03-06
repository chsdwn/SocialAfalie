import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import ActivityStore from './../../app/stores/activityStore';

import { Menu, Container, Button } from 'semantic-ui-react';

export const NavBar = observer(() => {
  const activityStore = useContext(ActivityStore);

  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }}/>
            Social Afalie
          </Menu.Item>
          <Menu.Item name='activities' />
          <Menu.Item>
            <Button onClick={activityStore.openCreateForm} positive content='Create Activity' />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  )
});
