const express = require('express');
const workRouter = express.Router({ mergeParams: true });

const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db');

workRouter.get('/', (req, res, next)=>{
    console.log("Fetching one minion work");
    const work = getFromDatabaseById('work', req.params.minionId);
    if (work === null || work === undefined){
        res.status(404).send("work to related minion Id non existent");
    } else{
        res.send(work);
    }
});

workRouter.post('/', (req, res, next)=>{
    console.log("post new work");
    const newWork = addToDatabase('work', req.body)
    if (newWork === null){
        res.status(400).send('Invalid work instance')
    } else{
        res.status(201).send(newWork);
    }
});


module.exports = workRouter;