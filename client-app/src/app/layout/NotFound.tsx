import React from "react";
import { Link } from "react-router-dom";

import { Segment, Header, Icon, Button } from "semantic-ui-react";

export const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" primary>
          Return to Activities page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};
