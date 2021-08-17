import { action, makeObservable, observable } from 'mobx';
import { values } from 'ramda';
import { rsMap } from 'src/api/ResourceStateMap';
import { MetricByIdT, MetricT } from 'src/metrics/types';
import { isUpdatedRS, RST } from 'src/utils/RST';

export const resUrls = {
  metricById: `MetricsStore/metricById`,
};

export class MetricsStore {
  @observable metricById: MetricByIdT = {};

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any, rs: RST, queryName: string) {
    if (queryName === 'getMetrics') {
      if (isUpdatedRS(rs)) {
        this.addMetrics(values(event.payload.data.metrics));
      }
      rsMap.registerRS(rs, [resUrls.metricById]);
    }
  }

  @action addMetrics = (metrics: MetricT[]) => {
    forEach((metric: MetricT) => {
      this.metricById[metric.id] = metric;
    }, metrics);
  };
}
