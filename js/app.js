$(function() {

    var displayErrorMessage = function(){
        var errorDiv = $("<div>");
        $("body").append(errorDiv);
        errorDiv.text("Unable to load the records");
    }

    $.get("http://localhost:8282/books/").done(function(result) {
        
        var body=$("body");

        for(var i=0; i<result.length; i++){
            var element = $(`<p id=${result[i].id}>${result[i].title}</p><div></div>`)
            body.append(element);
        };

        $("p").on("click",function(){
            var bookId=$(this).attr("id");

            $.get(`http://localhost:8282/books/${bookId}`).done(function(book){
                var info = `isbn: ${book.isbn}<br> author: ${book.author}<br> publisher: ${book.publisher} <br> type: ${book.type}`;
                var target = $(`#${book.id}`).next();
                if(target.is(':empty')){
                    target.append(info);
                } else {
                    target.empty();
                }
               
            })
        });

        // isbn	"9788324631766"
        // title	"Thiniking in Java"
        // author	"Bruce Eckel"
        // publisher	"Helion"
        // type	"programming"
    }).fail(displayErrorMessage);
});