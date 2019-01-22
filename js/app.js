$(function() {



    var displayErrorMessage = function(){
        var errorDiv = $("<div>");
        $("body").append(errorDiv);
        errorDiv.text("Unable to load the records");
    }


    $.get("http://localhost:8282/books/").done(function(result) {
        
        var table=$("table");

        for(var i=0; i<result.length; i++){
            table.append(`<tr><td>${result[i].title}</td></tr>`);
        };

    }).fail(displayErrorMessage);



});