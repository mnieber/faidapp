import { ContentModelT } from "src/models/types";
import { ModelClass } from "src/models/ModelClass";
import { Project } from "src/projects/models";
import axios from "axios";

export const getOrCreateModelFromContentModel = (
  modelClass: any,
  body: ContentModelT
) => {
  const model = modelClass.findOne({ where: { uid: body.uid } });
  if (model) {
    return model;
  }
  return modelClass.createFromContentModel(body);
};

export const getModelClassFromContentModel = (body: ContentModelT) => {
  if (body.model === "project") {
    return Project;
  }
  return undefined;
};

export const updateContentModel = (
  modelClass: any,
  intId: number,
  body: ContentModelT
) => {
  return axios.post(`${modelClass.contentResourceName()}/${intId}`, body);
};
