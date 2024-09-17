const checkMillionDollarIdea = (req, res, next) => {
    console.log("validating Million Dollar Ideas")
    const weeklyRevenue = req.body.weeklyRevenue;
    const numWeeks = req.body.numWeeks;

    if (isNaN(weeklyRevenue) || isNaN(numWeeks)) {
        return res.status(400).send('weeklyRevenue or numWeeks is missing or not a valid number.');
      }
      
    // Calculate total revenue and check the condition
    const totalRevenue = weeklyRevenue * numWeeks;
    if (totalRevenue < 1000000) {
    return res.status(400).send('Idea value is less than 1,000,000.');
    }
    
    next();

};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
