const express = require('express');
const apiRouter = express.Router();
const { createMeeting,
        getAllFromDatabase,
        getFromDatabaseById,
        addToDatabase,
        updateInstanceInDatabase,
        deleteFromDatabasebyId,
        deleteAllFromDatabase} = require('./db');

apiRouter.get('/minions', (req, res, next)=>{
    console.log("fetching all minions from database");
    const minionArray = getAllFromDatabase('minions');
    // console.log("total minion array "+minionArray.length);
    res.status(200).send(minionArray);
});

apiRouter.get('/minions/:id', (req, res, next) =>{
    console.log("Fetching one minion");
    const minion = getFromDatabaseById('minions', req.params.id);
    if (minion === null){
        res.status(404).send("id not found");
    } else{
        res.send(minion);
    }
});

apiRouter.post('/minions', (req, res, next) => {
    console.log("post minion");
    const newMinion = addToDatabase('minions', req.body)
    if (newMinion === null){
        res.status(400).send('Invalid Minion')
    } else{
        res.status(201).send(newMinion);
    }
});

apiRouter.put('/minions/:id', (req, res, next)=>{
    console.log("edit minion");
    const minion = updateInstanceInDatabase('minions', req.body);
    if (minion === null){
        res.status(404).send("id not found");
    } else{
        res.send(minion);
    }
});

apiRouter.delete('/minions/:id', (req,res,next) =>{
    console.log("deleting one minion");
    const status = deleteFromDatabasebyId('minions', req.params.id)
    if (status === true ){
        res.status(204).send();
    } else{
        res.status(404).send("id not found");
    }
})


module.exports = apiRouter;
