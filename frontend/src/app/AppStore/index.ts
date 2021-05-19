import { observable, makeObservable } from 'mobx';
import { ProjectStore } from 'src/projects/ProjectStore';
import { MilestonesStore } from 'src/milestones/MilestonesStore';
import { MetricsStore } from 'src/metrics/MetricsStore';

export class AppStore {
  @observable projectStore: ProjectStore;
  @observable milestonesStore: MilestonesStore;
  @observable metricsStore: MetricsStore;

  constructor() {
    makeObservable(this);

    this.projectStore = new ProjectStore();
    this.milestonesStore = new MilestonesStore();
    this.metricsStore = new MetricsStore();

    this.applyPolicies();
  }

  applyPolicies() {}
}
