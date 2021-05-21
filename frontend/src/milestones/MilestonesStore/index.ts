import { action, observable, makeObservable } from 'mobx';
import { isUpdatedRS, resetRS, RST } from 'src/utils/RST';
import { forEach } from 'lodash/fp';
import * as milestonesApi from 'src/milestones/api';
import { values } from 'lodash/fp';

import { MilestoneT, MilestoneByIdT } from 'src/milestones/types';

export class MilestonesStore {
  @observable milestoneById: MilestoneByIdT = {};
  @observable milestoneByIdRS: RST = resetRS();

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any) {
    if (event.topic === 'LOAD_PROJECT') {
      const milestones: MilestoneT[] = isUpdatedRS(event.payload.rs)
        ? values(event.payload.milestones)
        : [];
      this.addMilestones(milestones);
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
