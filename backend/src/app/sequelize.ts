import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("postgres://app:dev@postgres:5432/app");

const testDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDb();
