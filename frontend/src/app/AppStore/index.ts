import { makeObservable, observable } from 'mobx';
import { Api } from 'src/api/Api';
import { storeConnectsToApi } from 'src/app/AppStore/policies';
import { AuthStore } from 'src/auth/AuthStore';
import { MetricsStore } from 'src/metrics/MetricsStore';
import { MilestonesStore } from 'src/milestones/MilestonesStore';
import { ProjectStore } from 'src/projects/ProjectStore';

export class AppStore {
  @observable authStore: AuthStore;
  @observable projectStore: ProjectStore;
  @observable milestonesStore: MilestonesStore;
  @observable metricsStore: MetricsStore;
  @observable api: Api = new Api();

  constructor() {
    makeObservable(this);

    this.authStore = new AuthStore();
    this.projectStore = new ProjectStore();
    this.milestonesStore = new MilestonesStore();
    this.metricsStore = new MetricsStore();

    this.applyPolicies();
  }

  applyPolicies() {
    storeConnectsToApi(this.authStore, this.api);
    storeConnectsToApi(this.projectStore, this.api);
    storeConnectsToApi(this.milestonesStore, this.api);
    storeConnectsToApi(this.metricsStore, this.api);
  }
}
