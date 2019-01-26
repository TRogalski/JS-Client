$(function() {
    
    function addBook(book){
        var body=$("body");
        var element = $(`<div id=${book.id}>${book.title}<button id=btn${book.id} data-id=${book.id}>Remove</button></div><div></div>`);
        body.append(element);
        $(`#${book.id}`).on("click", function(book){
            
            var bookId = $(this).attr("id");
            $.get(`http://localhost:8282/books/${bookId}`).done(function(book){
                var info = `isbn: ${book.isbn}<br> author: ${book.author}<br> publisher: ${book.publisher} <br> type: ${book.type}`;
                var target = $(`#${book.id}`).next();
                if(target.is(':empty')){
                    target.append(info);
                } else {
                    target.empty();
                }
            })


        })

        $(`#btn${book.id}`).on("click",function(event){
            event.stopPropagation();
            var bookId = event.target.dataset.id;
            $.ajax({
                url: `http://localhost:8282/books/${bookId}`,
                type: 'DELETE'
            }).done(function(){
                $(`#${bookId}`).next().remove();
                $(`#${bookId}`).remove();
                $(`#btn${bookId}`).remove();
            });
        })
    }

    $.get(`http://localhost:8282/books/`).done(function(books) {
        for(var book of books){
            addBook(book);
        }
    })

    $("#test-form").submit(function(e){
        e.preventDefault();
        
        var isbn = $("#test-form input[name=isbn]").val();
        var title = $("#test-form input[name=title]").val();
        var author = $("#test-form input[name=author]").val();
        var publisher = $("#test-form input[name=publisher]").val();
        var type = $("#test-form input[name=type]").val();

        $.ajax({
            url: 'http://localhost:8282/books',
            type: 'POST',
            data: JSON.stringify({isbn, title, author, publisher, type}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).done(function(book){
            addBook(book);
        })
    })
});