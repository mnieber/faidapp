import { always, flow } from 'lodash/fp';
import { doQuery } from 'src/utils/graphqlClient';

export function getMetrics() {
  const query = `query queryMetrics {
    metrics {
      id
      name
    }
  }`;
  const vars = {};
  return doQuery(query, vars).then((response) => {
    return {
      metrics: flow(
        always(response.metrics),
      )(),
    };
  });
}

export function saveMetric(values: any) {
    console.log("TODO: save", values);
}
