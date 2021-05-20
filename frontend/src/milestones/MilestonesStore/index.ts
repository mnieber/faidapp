import { action, observable, makeObservable } from 'mobx';
import { RST, resetRS } from 'src/utils/RST';
import { forEach } from 'lodash/fp';
import * as milestonesApi from 'src/milestones/api';

import { MilestoneT, MilestoneByIdT } from 'src/milestones/types';

export class MilestonesStore {
  @observable milestoneById: MilestoneByIdT = {};
  @observable milestoneByIdRS: RST = resetRS();

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any) {
    if (event.topic === 'LOAD_PROJECT') {
    }
  }

  @action saveMilestone = (values: any) => {
    milestonesApi.saveMilestone(values);
  };

  @action addMilestones = (milestones: MilestoneT[]) => {
    forEach((milestone: MilestoneT) => {
      this.milestoneById[milestone.id] = milestone;
    }, milestones);
  };
}
