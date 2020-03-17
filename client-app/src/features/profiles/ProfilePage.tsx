import React from "react";

import { ProfileHeader } from "./ProfileHeader";
import { ProfileContext } from "./ProfileContext";

import { Grid } from "semantic-ui-react";

export const ProfilePage = () => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader />
        <ProfileContext />
      </Grid.Column>
    </Grid>
  );
};
