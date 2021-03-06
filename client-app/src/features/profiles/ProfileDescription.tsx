import React, { useContext, useState } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";

import { ProfileEditForm } from "./ProfileEditForm";

import { Tab, Grid, Header, Button } from "semantic-ui-react";

export const ProfileDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const { updateProfile, profile, isCurrentUser } = rootStore.profileStore;

  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile!.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit Mode"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEditForm updateProfile={updateProfile} profile={profile!} />
          ) : (
            <span>{profile!.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};
