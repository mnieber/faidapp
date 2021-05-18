import { MilestoneT } from "src/milestones/types";
import { input } from "skandha";

export class Inputs {
  @input milestones: Array<MilestoneT> = [];
}