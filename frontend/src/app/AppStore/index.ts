import { observable, makeObservable } from 'mobx';
import { Api } from 'src/api/Api';
import { ProjectStore } from 'src/projects/ProjectStore';
import { MilestonesStore } from 'src/milestones/MilestonesStore';
import { MetricsStore } from 'src/metrics/MetricsStore';
import { storeConnectsToApi } from 'src/app/AppStore/policies';

export class AppStore {
  @observable projectStore: ProjectStore;
  @observable milestonesStore: MilestonesStore;
  @observable metricsStore: MetricsStore;
  api: Api = new Api();

  constructor() {
    makeObservable(this);

    this.projectStore = new ProjectStore();
    this.milestonesStore = new MilestonesStore();
    this.metricsStore = new MetricsStore();

    this.applyPolicies();
  }

  applyPolicies() {
    storeConnectsToApi(this.projectStore, this.api);
    storeConnectsToApi(this.milestonesStore, this.api);
    storeConnectsToApi(this.metricsStore, this.api);
  }
}
