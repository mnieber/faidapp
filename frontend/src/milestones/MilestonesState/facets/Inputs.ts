import { input } from 'skandha';
import { MilestoneT } from 'src/milestones/types';

export class Inputs {
  @input milestones: Array<MilestoneT> = [];
}
