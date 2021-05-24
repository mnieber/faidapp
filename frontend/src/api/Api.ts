import { normalize, schema } from 'normalizr';
import { doQuery } from 'src/utils/graphqlClient';
import { ApiBase } from 'src/api/ApiBase';

const milestone = new schema.Entity('milestones');
const milestoneList = new schema.Array(milestone);
const project = new schema.Entity('projects', { milestones: milestoneList });

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
        imageHash
        imageProps
        content
        milestones {
          id
          name
          content
          isCompleted
        }
      }
    }`;

    const vars = { slug };

    return this._dispatchLoading(topic)
      .then(() => doQuery(query, vars))
      .then((response) => {
        const normalized_data = normalize(response.project, project);
        this._dispatchPayload(topic, normalized_data.entities);
      })
      .catch((error) => {
        const msg = error.response.errors[0].message;
        this._dispatchError(topic, msg);
      });
  }
}
