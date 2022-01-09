const MainRouter = require("express").Router();
// const MainRouter = require('express-promise-router')();
MainRouter.use("/devices",require("./devices"));
/* MainRouter.use("/library",require("./library"));
MainRouter.use("/post",require("./post")); */

module.exports = MainRouter;
