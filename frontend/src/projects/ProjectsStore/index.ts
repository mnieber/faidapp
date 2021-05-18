import { makeObservable } from 'mobx'

import { action, observable, makeObservable } from 'mobx';
import { RST, resetRS, updateRes } from 'src/utils/RST';
import { forEach } from 'lodash/fp';
import * from 'src/projects/api' as projectsApi;

import { ProjectT, ProjectByIdT } from 'src/projects/types';

export class ProjectsStore {

  @observable projectById: ProjectByIdT = {};
  @observable projectByIdRS: RST = resetRS();


  constructor() {
    makeObservable(this);
  }


  @action loadProjects = () => {
    updateRes(
      this,
      'projectByIdRS',
      () => {
        return projectsApi.getProjects();
      },
      (response: any) => {
        this.addProjects(response.projects);
      },
      (message: any) => {
        console.log(message);
        return 'Oops, there was an error getting the projects data';
      }
    );
  }

  @action saveProject = (values: any) => {
    projectsApi.saveProject(values);
  }

  @action addProjects = (projects: ProjectT[]) => {
    forEach((project: ProjectT) => {
      this.projectById[project.id] = project;
    }, projects);
  }


}