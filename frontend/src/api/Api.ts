import { normalize, schema } from 'normalizr';
import { doQuery } from 'src/utils/graphqlClient';
import { ApiBase } from 'src/api/ApiBase';

const project = new schema.Entity('projects');

export class Api extends ApiBase {
  loadProjectBySlug(slug: string) {
    const topic = 'LOAD_PROJECT';

    const query = `query loadProjectBySlug(
      $slug: String
    ) {
      project(
        slug: $slug
      ) {
        id
        name
      }
    }`;

    const vars = { slug };

    return this._dispatchLoading(topic)
      .then(() => doQuery(query, vars))
      .then((response) => {
        const normalized_data = normalize(response.project, project);
        this._dispatchPayload(topic, normalized_data.entities);
      })
      .catch((error) => this._dispatchError(topic, error));
  }
}
