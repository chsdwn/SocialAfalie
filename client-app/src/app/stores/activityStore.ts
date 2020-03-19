import { SyntheticEvent } from 'react';
import { history } from '../..';
import { observable, action, computed, runInAction } from 'mobx';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { setActivityProps, createAttendee } from './../common/util/util';
import { toast } from 'react-toastify';
import { HubConnection, HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

import { IActivity } from './../models/activity';

export default class ActivityStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable activityRegistry = new Map();
  @observable activity: IActivity | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';
  @observable loading = false;
  @observable.ref hubConnection: HubConnection | null = null;

  @action createHubConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/chat", {
        accessTokenFactory: () => this.rootStore.commonStore.token!
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection?.state))
      .catch(error => console.log(error));

    this.hubConnection.on("ReceiveComment", comment => {
      this.activity!.comments.push(comment);
    })
  }

  @action stopHubConnection = () => {
    this.hubConnection!.stop();
  }

  @action addComment = async (values: any) => {
    values.activityId = this.activity!.id;

    try {
      await this.hubConnection!.invoke("SendComment", values);
    } catch (error) {

    }
  }

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
  };

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a1, a2) => a1.date.getTime() - a2.date.getTime()
    );

    return Object.entries(sortedActivities.reduce((activities, activity) => {
      const date = activity.date.toISOString().split('T')[0];
      activities[date] = activities[date] ? [...activities[date], activity] : [activity];
      return activities;
    }, {} as { [key: string]: IActivity[] }));
  }

  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
  };

  @action loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities', () => {
        activities.forEach(activity => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activityRegistry.set(activity.id, activity);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction('reset loadingInitial', () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      this.loadingInitial = true;

      try {
        activity = await agent.Activities.details(id);
        runInAction('getting activity', () => {
          this.activity = activity;
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activityRegistry.set(activity.id, activity);
        });
        return activity;
      } catch (error) {
        console.log(error);
      } finally {
        runInAction('reset loadingInitial', () => {
          this.loadingInitial = false;
        });
      }
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  }

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;

    try {
      await agent.Activities.create(activity);

      const attendee = createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;

      let attendees = [];
      attendees.push(attendee);

      activity.attendees = attendees;
      activity.isHost = true;

      runInAction('creating activity', () => {
        this.activityRegistry.set(activity.id, activity);
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      toast.error("Problem sumitting data");
      console.log(error.response);
    } finally {
      runInAction('reset submitting', () => {
        this.submitting = false;
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;

    try {
      await agent.Activities.update(activity);
      runInAction('editing activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction('reset submitting', () => {
        this.submitting = false;
      });
    }
  };

  @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;

    try {
      await agent.Activities.delete(id);
      runInAction('deleting activity', () => {
        this.activityRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction('resetting after delete', () => {
        this.submitting = false;
        this.target = '';
      });
    }
  };

  @action cancelSelectedActivity = () => {
    this.activity = null;
  };

  @action attendActivity = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;

    try {
      await agent.Activities.attend(this.activity!.id);
      runInAction('attend', () => {
        if (this.activity) {
          this.activity.attendees.push(attendee);
          this.activity.isGoing = true;
          this.activityRegistry.set(this.activity.id, this.activity);
        }
      });
    } catch (error) {
      toast.error("Problem signing up to activity");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  @action cancelAttendance = async () => {
    this.loading = true;

    try {
      await agent.Activities.unattend(this.activity!.id);
      runInAction("cancel attendance", () => {
        if (this.activity) {
          this.activity.attendees = this.activity.attendees.filter(
            a => a.username !== this.rootStore.userStore.user!.username
          );
          this.activity.isGoing = false;
          this.activityRegistry.set(this.activity.id, this.activity);
        }
      });
    } catch (error) {
      toast.error("Problem cancelling attendance");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
