import { normalize, schema } from 'normalizr';
import { ApiBase } from 'src/api/ApiBase';
import { ObjT } from 'src/utils/types';

const milestone = new schema.Entity('milestones');
const milestoneList = new schema.Array(milestone);
const project = new schema.Entity('projects', { milestones: milestoneList });

export class Api extends ApiBase {
  getProjectBySlug(slug: string) {
    return this._doQuery(
      'getProjectBySlug',
      `query getProjectBySlug(
        $slug: String
      ) {
      projectBySlug(
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
    }`,
      {
        slug,
      },
      (response: ObjT) => normalize(response.projectBySlug, project).entities,
      (error: ObjT) => error.response.errors[0].message
    );
  }
}
