import { action, observable, makeObservable } from 'mobx';
import { ProjectT } from 'src/projects/types';
import { resetRS, RST, updateRes } from 'src/utils/RST';

import * as projectsApi from 'src/projects/api';

export class ProjectStore {
  @observable project?: ProjectT;
  @observable projectRS: RST = resetRS();

  constructor() {
    makeObservable(this);
  }

  @action loadProjectBySlug(slug: string) {
    updateRes(
      this,
      'projectRS',
      () => {
        return projectsApi.getProjectBySlug(slug);
      },
      (response: any) => {
        this.project = response.project;
      },
      (message: any) => {
        console.log(message);
        return 'Oops, there was an error getting the milestones data';
      }
    );
  }
}
