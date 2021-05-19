import { action, observable, makeObservable } from 'mobx';
import { RST, resetRS, updateRes } from 'src/utils/RST';
import { forEach } from 'lodash/fp';
import * as metricsApi from 'src/metrics/api';

import { MetricT, MetricByIdT } from 'src/metrics/types';

export class MetricsStore {
  @observable metricById: MetricByIdT = {};
  @observable metricByIdRS: RST = resetRS();

  constructor() {
    makeObservable(this);
  }

  @action loadMetrics = () => {
    updateRes(
      this,
      'metricByIdRS',
      () => {
        return metricsApi.getMetrics();
      },
      (response: any) => {
        this.addMetrics(response.metrics);
      },
      (message: any) => {
        console.log(message);
        return 'Oops, there was an error getting the metrics data';
      }
    );
  };

  @action saveMetric = (values: any) => {
    metricsApi.saveMetric(values);
  };

  @action addMetrics = (metrics: MetricT[]) => {
    forEach((metric: MetricT) => {
      this.metricById[metric.id] = metric;
    }, metrics);
  };
}
