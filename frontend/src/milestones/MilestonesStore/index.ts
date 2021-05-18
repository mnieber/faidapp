import { makeObservable } from 'mobx'

import { action, observable, makeObservable } from 'mobx';
import { RST, resetRS, updateRes } from 'src/utils/RST';
import { forEach } from 'lodash/fp';
import * from 'src/milestones/api' as milestonesApi;

import { MilestoneT, MilestoneByIdT } from 'src/milestones/types';

export class MilestonesStore {

  @observable milestoneById: MilestoneByIdT = {};
  @observable milestoneByIdRS: RST = resetRS();


  constructor() {
    makeObservable(this);
  }


  @action loadMilestones = () => {
    updateRes(
      this,
      'milestoneByIdRS',
      () => {
        return milestonesApi.getMilestones();
      },
      (response: any) => {
        this.addMilestones(response.milestones);
      },
      (message: any) => {
        console.log(message);
        return 'Oops, there was an error getting the milestones data';
      }
    );
  }

  @action saveMilestone = (values: any) => {
    milestonesApi.saveMilestone(values);
  }

  @action addMilestones = (milestones: MilestoneT[]) => {
    forEach((milestone: MilestoneT) => {
      this.milestoneById[milestone.id] = milestone;
    }, milestones);
  }


}