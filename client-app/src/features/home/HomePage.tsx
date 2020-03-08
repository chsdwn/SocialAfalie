import React from "react";
import { Link } from "react-router-dom";

import classes from "./HomePage.module.css";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";

export const HomePage = () => {
  return (
    <Segment inverted textAlign="center" vertical className={classes.masthead}>
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Social Afalie
        </Header>
        <Header as="h2" inverted content="Welcome to Social Afalie" />
        <Button as={Link} to="/activities" size="huge" inverted>
          Take me to the activities!
        </Button>
      </Container>
    </Segment>
  );
};
