import { action, observable, makeObservable } from 'mobx';
import { forEach } from 'lodash/fp';

import { MetricT, MetricByIdT } from 'src/metrics/types';

export const resourceUrls = {
  metricById: `MetricsStore/metricById`,
};

export class MetricsStore {
  @observable metricById: MetricByIdT = {};

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any) {}

  @action addMetrics = (metrics: MetricT[]) => {
    forEach((metric: MetricT) => {
      this.metricById[metric.id] = metric;
    }, metrics);
  };
}
