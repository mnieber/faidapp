import { action, makeObservable, observable } from 'mobx';
import { forEach, values } from 'ramda';
import { rsMap } from 'src/api/ResourceStateMap';
import { MilestoneByIdT, MilestoneT } from 'src/milestones/types';
import { isUpdatedRS, RST } from 'src/utils/RST';
import { ObjT } from 'src/utils/types';

export const resUrls = {
  milestoneById: `MilestonesStore/milestoneById`,
};

export class MilestonesStore {
  @observable milestoneById: MilestoneByIdT = {};

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any, rs: RST, queryName: string, data: ObjT) {
    if (queryName === 'getProjectBySlug') {
      if (isUpdatedRS(rs)) {
        const milestones: MilestoneT[] = values(data.milestones);
        this.addMilestones(milestones);
      }
      rsMap.registerRS(rs, [resUrls.milestoneById]);
    }
  }

  @action addMilestones = (milestones: MilestoneT[]) => {
    forEach((milestone: MilestoneT) => {
      this.milestoneById[milestone.id] = milestone;
    }, milestones);
  };
}
