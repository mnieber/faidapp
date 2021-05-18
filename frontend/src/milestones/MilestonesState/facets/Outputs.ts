import { computed } from 'mobx';
import { MilestoneT, MilestoneByIdT } from 'src/milestones/types';
import { listToItemById } from 'src/utils/ids';
import { output } from 'skandha';

export class Outputs {
  @output milestonesDisplay: Array<MilestoneT> = [];

  @computed get milestoneById(): MilestoneByIdT {
    return listToItemById(this.milestonesDisplay);
  }

}