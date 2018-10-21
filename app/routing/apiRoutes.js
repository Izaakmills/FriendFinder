
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

    // New Post Section

    app.post("/api/friends", function (req, res) {

        // Store current user scores in array then convert to a single total sumvagra
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

            // console.log(`${userName}'s score is ${userTotalScore}`)
            // loops through each user and stores whoever has the smallest difference in smallest variable
            console.log(`\n-------------\n${userName}'s difference is ${Math.abs(userTotalScore - currentUserScore)}\n`)
            var userDifference = Math.abs(userTotalScore - currentUserScore)

            if (userDifference < smallest) {
                console.log(`${userName} triggered if statement`)
                smallest = userDifference
                match = userName
                pic = user.photo
                console.log(smallest + match + pic)
            }

        })
        console.log(`You should be best friends with ${match}`)

        // lodash find index method
        let uIndex = _.findIndex(userData, function (o) { return o.name == match })
        console.log(uIndex)

        // Push new user to database
        userData.push(req.body)

        res.send(userData[uIndex])
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
