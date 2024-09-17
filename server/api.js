const express = require('express');
const apiRouter = express.Router();

const minionRouter = require('./minionsRouter');

apiRouter.use('/minions', minionRouter);

module.exports = apiRouter;
