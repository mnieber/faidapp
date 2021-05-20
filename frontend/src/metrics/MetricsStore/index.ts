import { action, observable, makeObservable } from 'mobx';
import { RST, resetRS } from 'src/utils/RST';
import { forEach } from 'lodash/fp';
import * as metricsApi from 'src/metrics/api';

import { MetricT, MetricByIdT } from 'src/metrics/types';

export class MetricsStore {
  @observable metricById: MetricByIdT = {};
  @observable metricByIdRS: RST = resetRS();

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any) {
    if (event.topic === 'LOAD_PROJECT') {
    }
  }

  @action saveMetric = (values: any) => {
    metricsApi.saveMetric(values);
  };

  @action addMetrics = (metrics: MetricT[]) => {
    forEach((metric: MetricT) => {
      this.metricById[metric.id] = metric;
    }, metrics);
  };
}
