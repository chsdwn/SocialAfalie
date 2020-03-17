import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";

export const NavBar = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header as={NavLink} exact to="/">
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: "10px" }}
            />
            Social Afalie
          </Menu.Item>
          <Menu.Item name="activities" as={NavLink} to="/activities" />
          <Menu.Item>
            <Button
              positive
              content="Create Activity"
              as={Link}
              to="/createActivity"
            />
          </Menu.Item>
          {user && (
            <Menu.Item position="right">
              <Image
                avatar
                spaced="right"
                src={user.image || "/assets/user.png"}
              />
              <Dropdown pointing="top left" text={user.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/profile/${user.username}`}
                    text="My profile"
                    icon="user"
                  />
                  <Dropdown.Item onClick={logout} text="Logout" icon="power" />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}
        </Container>
      </Menu>
    </div>
  );
});
