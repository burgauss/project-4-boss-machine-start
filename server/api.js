const express = require('express');
const apiRouter = express.Router();

const minionRouter = require('./minionsRouter');
const ideasRouter = require('./ideasRouter');

apiRouter.use('/minions', minionRouter);
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;
