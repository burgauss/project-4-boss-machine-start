const express = require('express');
const workRouter = express.Router({ mergeParams: true });

const {
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    getAllWorkFromMinionId} = require('./db');

workRouter.get('/', (req, res, next)=>{
    console.log("Fetching one minion work");
    const work = getAllWorkFromMinionId(req.params.minionId);
    //TODO: make this function to return an array
    // console.log("result of getAllWorkFromMinionId"+JSON.stringify(work, null, 2));
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

workRouter.put('/:workId', (req, res, next) =>{
    console.log("edit work");
    const work = getAllWorkFromMinionId(req.params.minionId);
    console.log("work of minion "+ req.params.minionId + " is " + JSON.stringify(work,null,2));

    if (work === null || work === undefined){
        res.status(404).send('work related to the minion id inexistent');
    } else{
        const workIdBelongstoMinion = work.some(work => work.id === req.params.workId);
        if (workIdBelongstoMinion){
            const editedWork = updateInstanceInDatabase('work', req.body);
            if (editedWork === null){
                res.status(404).send('work id not found');
            } else{
                res.send(editedWork);
            }
        } else{
            res.status(400).send('work id does not belong to the minion id');
        }
        // console.log('workId belongs to minionId: '+ workIdBelongstoMinion + ' req params work id: ' +req.params.workId);
    }

    // if (work.some(work => work.id === req.params.workId)){
    //     const editedWork = updateInstanceInDatabase('work', req.body);
    //     if (editedWork === null){
    //         res.status(404).send('work id not found');
    //     }
    //     res.send(editedWork);
    // }
    // res.status(404).send('work id not found');
    


});

workRouter.delete('/:workId', (req, res, next) =>{
    console.log("deleting one work");
    const status = deleteFromDatabasebyId('work', req.params.workId)
    if (status === true ){
        res.status(204).send();
    } else{
        res.status(404).send("work id not found");
    }
});

module.exports = workRouter;