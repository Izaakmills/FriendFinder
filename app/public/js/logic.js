$(function () {
    // var config = {
    //     '.chosen-select': {},
    //     '.chosen-select-deselect': { allow_single_deselect: true },
    //     '.chosen-select-no-single': { disable_search_threshold: 10 },
    //     '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
    //     '.chosen-select-width': { width: "95%" }
    // }

    // for (var selector in config) {
    //     $(selector).chosen(config[selector]);
    // }
    // Capture the form inputs 
    $("#submit").on("click", function () {
        console.log("button clicked")
        // Form validation
        function validateForm() {
            var isValid = true;
            $('.form-control').each(function () {
                if ($(this).val() === '')
                    isValid = false;
            });
            $('.chosen-select').each(function () {
                if ($(this).val() === "")
                    isValid = false
            })
            return isValid;
        }
        // If all required fields are filled
        if (validateForm() == true) {
            // Create an object for the user's data
            var userData = {
                name: $("#name").val(),
                photo: $("#photo").val(),
                scores: [$("#Q1").val(), $("#Q2").val(), $("#Q3").val(), $("#Q4").val(), $("#Q5").val(), $("#Q6").val(), $("#Q7").val(), $("#Q8").val(), $("#Q9").val(), $("#Q10").val(),]
            }
            // Grab the URL of the website
            var currentURL = window.location.origin;
            console.log(currentURL)

            // AJAX post the data to the friends API. 
            $.post(currentURL + "/api/friends", userData,
                function (data) {
                    // Grab the result from the AJAX post 
                    // Most compatible friend name.
                    $("#matchName").text(data.name);
                    // Most compatible friend photo.
                    $('#matchImg').attr("src", data.photo);
                    // Show the modal with the best match.
                    $("#resultsModal").modal('toggle');
                    // Clear form 
                    $("#name").val("");
                    $("#photo").val("");
                    $("#Q1").val("");
                    $("#Q2").val("");
                    $("#Q3").val("");
                    $("#Q4").val("");
                    $("#Q5").val("");
                    $("#Q6").val("");
                    $("#Q7").val("");
                    $("#Q8").val("");
                    $("#Q9").val("");
                    $("#Q10").val("");
                });
        }
        else {
            alert("Please fill out all fields before submitting!");
        }

        return false;
    });
})