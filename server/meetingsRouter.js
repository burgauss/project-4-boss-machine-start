const express = require('express');
const meetingsRouter = express.Router();

const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db');

    
meetingsRouter.get('/', (req, res, next) => {
    console.log("fetching all meetings from database");
    const meetingsArray = getAllFromDatabase('meetings');
    // console.log("total minion array "+minionArray.length);
    res.status(200).send(meetingsArray);
});


meetingsRouter.post('/', (req, res, next) => {
    console.log("post meeting");
    const newMeeting = createMeeting();
    if (newMeeting === null){
        res.status(400).send('Not possible to create Meeting')
    } else{
        addToDatabase('meetings', newMeeting);
        res.status(201).send(newMeeting);
    }
});


meetingsRouter.delete('/', (req,res,next) =>{
    console.log("deleting all meeetings");
    const status = deleteAllFromDatabase('meetings')
    if (status === null ){
        res.status(404).send("Not possible to delete all meetings");
    } else{
        res.status(204).send();
    }
})

module.exports = meetingsRouter;