import { createContext, SyntheticEvent } from 'react';
import { observable, action, computed, configure, runInAction } from 'mobx';
import agent from '../api/agent';

import { IActivity } from './../models/activity';

configure({'enforceActions': 'always'});

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable activity: IActivity | null = null;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';

  @computed get activitiesByDate(): IActivity[] {
    return Array
            .from(
              this.activityRegistry.values()
            ).sort(
              (a1, a2) => Date.parse(a1.date) - Date.parse(a2.date)
            );
  };

  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities', () => {
        activities.forEach(activity => {
          activity.date = activity.date.split('.')[0];
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
    } else {
      this.loadingInitial = true;

      try {
        activity = await agent.Activities.details(id);
        runInAction('getting activity', () => {
          this.activity = activity;
        });
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
      runInAction('creating activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
      });
      } catch (error) {
      console.log(error);
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
        this.editMode = false;
      });
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

  @action openCreateForm = () => {
    this.editMode = true;
    this.activity = null;
  };

  @action openEditForm = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.activity = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };
}

export default createContext(new ActivityStore())
