import { Model, DataTypes } from "sequelize";
import { ContentModelT } from "src/models/types";

export class ModelClass extends Model {
  static contentResourceName() {
    throw new Error("Not implemented");
  }
  static createFromContentModel(contentModel: ContentModelT) {
    throw new Error("Not implemented");
  }
}

export const modelClassMembers = {
  // Model attributes are defined here
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};
