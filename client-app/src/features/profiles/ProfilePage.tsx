import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { ProfileHeader } from "./ProfileHeader";
import { ProfileContext } from "./ProfileContext";
import { LoadingComponent } from "../../app/layout/LoadingComponent";

import { Grid } from "semantic-ui-react";

interface RouteParams {
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

export const ProfilePage: React.FC<IProps> = observer(({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadingProfile, profile, loadProfile } = rootStore.profileStore;

  useEffect(() => {
    loadProfile(match.params.username);
  }, [loadProfile, match]);

  if (loadingProfile) return <LoadingComponent content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile!} />
        <ProfileContext />
      </Grid.Column>
    </Grid>
  );
});
