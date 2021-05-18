"use strict";

import Koa from "koa";
import Router from "@koa/router";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import { sequelize } from "src/app/sequelize";
import {
  getModelClassFromContentModel,
  getOrCreateModelFromContentModel,
  updateContentModel,
} from "src/models/utils";
import { ContentModelT } from "src/models/types";

console.log(sequelize ? "Sequelize initialized" : "Sequelize not initialized");

const app = new Koa();
app.use(logger());
app.use(bodyParser());

const router = new Router();

router.post("/strapi-webhook", (ctx) => {
  const body: ContentModelT = ctx.request.body;
  const modelClass = getModelClassFromContentModel(body);
  if (modelClass) {
    const model = getOrCreateModelFromContentModel(modelClass, body);
    if (model.uid !== body.uid) {
      updateContentModel(modelClass, body.id, {
        ...body.entry,
        uid: model.uid,
      });
    }
  }
  ctx.body = "Hello World!!";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(1234);
