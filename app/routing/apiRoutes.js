
let userData = require("../data/friends");
let _ = require('lodash');

module.exports = function (app) {

    // ******************************************** 
    app.get("/api/friends", function (req, res) {
        console.log(req.body)
        res.json(userData);
    });

    let comparisonUserTotalScore = 0;
    let friendScores = [];

    // ********************************************
    app.post("/api/friends/errorout", function (req, res) {

        // Store current user scores in array.
        let curScores = req.body.scores;
        let curScores2 = curScores.map((num) => { return parseInt(num) })
        let currentUserScores = curScores2.reduce((a, b) => { return a + b })

        console.log("line 22 : Current user scores: " + currentUserScores);

        // Determine the user's most compatible friend, if there are actually friends in the database
        console.log("line 28 : number of friends in DB: " + userData.length)

        userData.forEach(function (user) {
            console.log("User: " + user.name)

            // Convert each user in db scores into an array of numbers.
            var comparisonUserScores = user.scores;
            console.log("line 35 : comparison user score is :" + user.scores)

            // Find total difference between current user and each user.
            comparisonUserTotalScore = calculateUserCompatibilityScore(currentUserScores, comparisonUserScores);

            // Build up array of user compatibility scores.
            friendScores.push(comparisonUserTotalScore);
        })
        // display current db users scores
        console.log("Array of friend scores: " + friendScores);

        let index = 0;
        let value = friendScores[0];

        //get index of user that score is lowest from useData array
        for (let i = 0; i < friendScores.length; i++) {
            console.log("Value of item in array: " + friendScores[i]);
            if (friendScores[i] < value) {
                value = friendScores[i];
                index = i;
            }
        }

        // get match
        console.log("Best friend name: " + userData[index].name);

        // Send best friend as a response so we can display in modal.
        res.send(userData[index]);

        // Push new user to database
        userData.push(req.body)

        console.log("number of friends in DB now: " + userData.length)

    });
    // };

    let totalDifference = 0;

    // New Post Section

    app.post("/api/friends", function (req, res) {

        // Store current user scores in array then convert to a single total sum
        let smallest = 1000
        let match = ""
        let curScores = req.body.scores;
        let curScores2 = curScores.map((num) => { return parseInt(num) })
        let currentUserScore = curScores2.reduce((a, b) => { return a + b }, 0)

        console.log(`\n${req.body.name}'s score is ${currentUserScore}`);


        userData.forEach((user) => {
            let userScores = user.scores
            let userName = user.name
            let userPartialScores = userScores.map((num) => { return parseInt(num) })
            let userTotalScore = userPartialScores.reduce((a, b) => { return a + b }, 0)
            // loops through each user and stores whoever has the smallest difference in smallest variable
            if (userTotalScore < smallest) {
                userData.indexOf()
                smallest = userTotalScore
                match = userName
                pic = user.photo
            }

        // calcArray.push({
        //     "name": userName,
        //     "difference": Math.abs(userTotalScore - currentUserScore)
        // })

        // console.log(`\n${userName}'s score is ${userTotalScore}`)
    })
    console.log(`You should be best friends with ${match}` )

    // Push new user to database
    userData.push(req.body)

    res.send(userData[])
})

// Find total difference between current user and another user.
function calculateUserCompatibilityScore(currentUserScores, comparisonUserScores) {

    // Reset the total difference counter each time function called.
    totalDifference = 0;

    for (var i = 0; i < currentUserScores.length; i++) {

        totalDifference += Math.abs(currentUserScores[i] - comparisonUserScores[i]);
    }

    console.log("Final total difference for friend: " + totalDifference);

    return totalDifference;
};
}
