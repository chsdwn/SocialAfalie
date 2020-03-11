import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

import { LoginForm } from "../user/LoginForm";
import { RegisterForm } from "../user/RegisterForm";

import classes from "./HomePage.module.css";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";

export const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

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
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to Activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header
              as="h2"
              inverted
              content="Welcome to Social Afalie"
            />
            <Button onClick={() => openModal(<LoginForm />)} size="huge" inverted>
              Login
            </Button>
            <Button onClick={() => openModal(<RegisterForm />)} size="huge" inverted>
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};
