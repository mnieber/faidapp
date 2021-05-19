import { always, flow } from 'lodash/fp';
import { doQuery } from 'src/utils/graphqlClient';

export function getMilestones() {
  const query = `query queryMilestones {
    milestones {
      id
      name
    }
  }`;
  const vars = {};
  return doQuery(query, vars).then((response) => {
    return {
      milestones: flow(always(response.milestones))(),
    };
  });
}

export function saveMilestone(values: any) {
  console.log('TODO: save', values);
}
