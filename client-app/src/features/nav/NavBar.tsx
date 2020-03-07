import React from "react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";

import { Menu, Container, Button } from "semantic-ui-react";

export const NavBar = observer(() => {
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
        </Container>
      </Menu>
    </div>
  );
});
