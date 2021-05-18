import { ModelClass, modelClassMembers } from "src/models/ModelClass";
import { ContentModelT } from "src/models/types";
import { DataTypes } from "sequelize";
import { sequelize } from "src/app/sequelize";

export class Project extends ModelClass {
  static contentResourceName() {
    return "projects";
  }
  static createFromContentModel(contentModel: ContentModelT) {
    const model = (this.constructor as any).create({
      createdAt: contentModel.created_at,
      updatedAt: contentModel.updated_at,
      name: (contentModel as any).name,
    });
    return model;
  }
}

Project.init(
  {
    ...modelClassMembers,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Project", // We need to choose the model name
  }
);
