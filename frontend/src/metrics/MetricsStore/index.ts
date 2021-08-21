import { action, makeObservable, observable } from 'mobx';
import { forEach, values } from 'ramda';
import { rsMap } from 'src/api/ResourceStateMap';
import { MetricByIdT, MetricT } from 'src/metrics/types';
import { isUpdatedRS, RST } from 'src/utils/RST';
import { ObjT } from 'src/utils/types';

export const resUrls = {
  metricById: `MetricsStore/metricById`,
};

export class MetricsStore {
  @observable metricById: MetricByIdT = {};

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any, rs: RST, queryName: string, data: ObjT) {
    if (queryName === 'getMetrics') {
      if (isUpdatedRS(rs)) {
        this.addMetrics(values(data.metrics));
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
