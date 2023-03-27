import { normalize, schema } from 'normalizr';
import { ApiBase } from 'src/api/ApiBase';
import { ObjT } from 'src/utils/types';

const milestone = new schema.Entity('milestones');
const milestones = new schema.Array(milestone);
const project = new schema.Entity('projects');

milestone.define({ project });
project.define({ milestones });

export class Api extends ApiBase {
  getProjectBySlug(slug: string) {
    return this._doQuery(
      'getProjectBySlug',
      `query getProjectBySlug(
        $slug: String
      ) {
        getProjectBySlug(
          slug: $slug
        ) {
          content
          id
          imageHash
          imageProps
          name
          slug
          milestones {
            content
            id
            name
            isCompleted
          }
        }
      }`,
      {
        slug,
      },
      (response: ObjT) =>
        normalize(response.getProjectBySlug, project).entities,
      (error: ObjT) => error.response.errors[0].message
    );
  }
}
