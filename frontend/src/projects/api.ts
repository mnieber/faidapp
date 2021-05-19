import { always, flow } from 'lodash/fp';
import { doQuery } from 'src/utils/graphqlClient';

export function getProjects() {
  const query = `query queryProjects {
    projects {
      id
      name
    }
  }`;
  const vars = {};
  return doQuery(query, vars).then((response) => {
    return {
      projects: flow(always(response.projects))(),
    };
  });
}

export function saveProject(values: any) {
  console.log('TODO: save', values);
}
