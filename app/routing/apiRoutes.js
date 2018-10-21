
var userData = require("../data/friends");

module.exports = function (app) {

    // ******************************************** 
    app.get("/api/friends", function (req, res) {
        console.log(req.body)
        res.json(userData);
    });

    var comparisonUserTotalScore = 0;
    var friendScores = [];

    // ********************************************
    app.post("/api/friends", function (req, res) {

        // Store current user scores in array.
        var currentUserScores = req.body.scores;

        console.log("Current user scores: " + currentUserScores);

        // Determine the user's most compatible friend, if there are actually friends in the database
        console.log("number of friends in DB: " + userData.length)

            for (var i = 0; i < userData.length; i++) {

                // Convert each user's results in to an array of numbers.
                var comparisonUserScores = userData[i].scores;
                console.log("comparison user score is :" + userData[i].score)

                // Find total difference between current user and each user.
                comparisonUserTotalScore = calculateUserCompatibilityScore(currentUserScores, comparisonUserScores);

                // Build up array of user compatibility scores.
                friendScores.push(comparisonUserTotalScore);
            }
 

        console.log("Array of friend scores: " + friendScores);

        var index = 0;
        var value = friendScores[0];

        for (var i = 0; i < friendScores.length; i++) {
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

        // Push new user to datbase
        if (userData.length !== 1) {
            userData.push(req.body)
        }

        console.log("number of friends in DB now: " + userData.length)

    });
    // };

    var totalDifference = 0;

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
