import { observable, makeObservable } from 'mobx';
import { ProjectsStore } from 'src/projects/ProjectsStore';
import { MilestonesStore } from 'src/milestones/MilestonesStore';
import { MetricsStore } from 'src/metrics/MetricsStore';

export class AppStore {
  @observable projectsStore: ProjectsStore;
  @observable milestonesStore: MilestonesStore;
  @observable metricsStore: MetricsStore;

  constructor() {
    makeObservable(this);

    this.projectsStore = new ProjectsStore();
    this.milestonesStore = new MilestonesStore();
    this.metricsStore = new MetricsStore();

    this.applyPolicies();
  }

  applyPolicies() {
  }
}