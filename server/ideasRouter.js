const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db');

    
ideasRouter.get('/', (req, res, next) => {
    console.log("fetching all ideas from database");
    const ideasArray = getAllFromDatabase('ideas');
    // console.log("total minion array "+minionArray.length);
    res.status(200).send(ideasArray);
});

ideasRouter.get('/:id', (req, res, next) =>{
    console.log("Fetching ideas by Id");
    const idea = getFromDatabaseById('ideas', req.params.id);
    if (idea === null || idea === undefined){
        res.status(404).send("Ideas Id not found");
    } else{
        res.send(idea);
    }
});

ideasRouter.post('/',checkMillionDollarIdea, (req, res, next) => {
    console.log("posting idea");
    const newIdea = addToDatabase('ideas', req.body)
    if (newIdea === null){
        res.status(400).send('Invalid Idea')
    } else{
        res.status(201).send(newIdea);
    }
});

ideasRouter.put('/:id', (req, res, next)=>{
    console.log("edit idea");
    const idea = updateInstanceInDatabase('ideas', req.body);
    if (idea === null){
        res.status(404).send("Idea id not found");
    } else{
        res.send(idea);
    }
});

ideasRouter.delete('/:id', (req,res,next) =>{
    console.log("deleting one idea");
    const status = deleteFromDatabasebyId('ideas', req.params.id)
    if (status === true ){
        res.status(204).send();
    } else{
        res.status(404).send("Idea id not found");
    }
})

module.exports = ideasRouter;