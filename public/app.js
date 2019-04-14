$( document ).ready(function() {
    $.getJSON('/all', function (data) {
        console.log(data)
    }).then(function () {
        $.getJSON('/articles', function (data) {
            $('.articles').empty()
            for (let i = 0; i < 20; i++) {
                if (data[i].favorited) {
                    let displayDiv = $('<div>').append(
                        $('<h3>').text(data[i].title),
                        $('<img>').attr('src', data[i].image).attr('width', '200px'),
                        $('<p>').text(data[i].description),
                        $('<a>').text('Go to the article!').attr('href', 'http://www.nintendolife.com/' + data[i].link),
                        $('<p>').text('Article has been Saved').addClass('savedAlert')
                    ).addClass('articleDiv').attr('data-id', data[i]._id)
                    $('.articles').append(displayDiv)
                } else {
                    let displayDiv = $('<div>').append(
                        $('<h3>').text(data[i].title),
                        $('<img>').attr('src', data[i].image).attr('width', '200px'),
                        $('<p>').text(data[i].description),
                        $('<a>').text('Go to the article!').attr('href', 'http://www.nintendolife.com/' + data[i].link),
                        $('<button>').text('Save Article').addClass('saveButton').attr('type', 'submit').attr('data-id', data[i]._id)
                    ).addClass('articleDiv').attr('data-id', data[i]._id)
                    $('.articles').append(displayDiv)
                }
            }
        })
    })
});

$('.deleteArticles').on('click', function (e) {
    e.preventDefault()
    $.ajax({
        method: "DELETE",
        url: '/cleanDb',
    }).then(function (data) {
        $.getJSON('/all', function (data) {
            console.log(data)
        }).then(function () {
            $.getJSON('/articles', function (data) {
                $('.articles').empty()
                for (let i = 0; i < 20; i++) {
                    if (data[i].favorited) {
                        let displayDiv = $('<div>').append(
                            $('<h3>').text(data[i].title),
                            $('<img>').attr('src', data[i].image).attr('width', '200px'),
                            $('<p>').text(data[i].description),
                            $('<a>').text('Go to the article!').attr('href', 'http://www.nintendolife.com/' + data[i].link),
                            $('<p>').text('Article has been Saved').addClass('savedAlert')
                        ).addClass('articleDiv').attr('data-id', data[i]._id)
                        $('.articles').append(displayDiv)
                    } else {
                        let displayDiv = $('<div>').append(
                            $('<h3>').text(data[i].title),
                            $('<img>').attr('src', data[i].image).attr('width', '200px'),
                            $('<p>').text(data[i].description),
                            $('<a>').text('Go to the article!').attr('href', 'http://www.nintendolife.com/' + data[i].link),
                            $('<button>').text('Save Article').addClass('saveButton').attr('type', 'submit').attr('data-id', data[i]._id)
                        ).addClass('articleDiv').attr('data-id', data[i]._id)
                        $('.articles').append(displayDiv)
                    }
                }
            })
        })
    })
})


$('.refresh').on('click', function (e) {
    e.preventDefault()
    $('.articles').empty()
    $.getJSON('/all', function (data) {
        console.log(data)
    })
    $.getJSON('/articles', function (data) {
        for (let i = 0; i < 20; i++) {
            if (data[i].favorited) {
                let displayDiv = $('<div>').append(
                    $('<h3>').text(data[i].title),
                    $('<img>').attr('src', data[i].image).attr('width', '200px'),
                    $('<p>').text(data[i].description),
                    $('<a>').text('Go to the article!').attr('href', 'http://www.nintendolife.com/' + data[i].link),
                    $('<p>').text('Article has been Saved').addClass('savedAlert')
                ).addClass('articleDiv').attr('data-id', data[i]._id)
                $('.articles').append(displayDiv)
            } else {
                let displayDiv = $('<div>').append(
                    $('<h3>').text(data[i].title),
                    $('<img>').attr('src', data[i].image).attr('width', '200px'),
                    $('<p>').text(data[i].description),
                    $('<a>').text('Go to the article!').attr('href', 'http://www.nintendolife.com/' + data[i].link),
                    $('<button>').text('Save Article').addClass('saveButton').attr('type', 'submit').attr('data-id', data[i]._id)
                ).addClass('articleDiv').attr('data-id', data[i]._id)
                $('.articles').append(displayDiv)
            }
        }
    })
})



$('.savedArticles').on('click', function (e) {
    e.preventDefault();
    $('.articles').empty();
    $.getJSON('/favorites', function (data) {
        for (let i = 0; i < data.length; i++) {
            let displayDiv = $('<div>').append(
                $('<h3>').text(data[i].title),
                $('<img>').attr('src', data[i].image).attr('width', '200px'),
                $('<p>').text(data[i].description),
                $('<a>').text('Go to the article!').attr('href', 'http://www.nintendolife.com/' + data[i].link),
                $('<button>').text('Add a Comment').addClass('commentButton').attr('tybpe', 'submit').attr('data-id', data[i]._id),
                $('<button>').text('Delete Article').addClass('deleteButton').attr('type', 'submit').attr('data-id', data[i]._id),
                $('<div>').addClass('commentDiv')
            ).addClass('articleDiv').attr('data-id', data[i]._id)
            $('.articles').append(displayDiv)
        }
    })
})

$(document).on('click', '.saveButton', function (e) {
    e.preventDefault();
    let thisId = $(this).attr('data-id');
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
    }).then(function (data) {
        console.log(data)
    })
});

$(document).on('click', '.deleteButton', function (e) {
    e.preventDefault();
    let thisId = $(this).attr('data-id');
    $(this).text('Article Deleted')
    $.ajax({
        method: "POST",
        url: "/remove/" + thisId,
    }).then(function (data) {
        console.log(data)
    })
});

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
$(document).on('click', '.commentButton', function (e) {
    let thisId = $(this).attr('data-id')
    e.preventDefault();
    $('#submitComment').empty();
    $('#submitComment').append(
        $('<button>').addClass('commentSubmit').attr('data-id', thisId).text('Submit Comment')
    )
    $.ajax({
        method: 'GET',
        url: '/article/' + thisId
    }).then(function (data) {
        $('.modalTitle').text(data.title)
        if (data.comment) {
            $("#titleInput").val(data.comment.title);
            $("#bodyInput").val(data.comment.body);
        }
    })
    modal.style.display = 'block';

})
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(document).on('click', '.commentSubmit', function () {
    let thisId = $(this).attr('data-id');
    $.ajax({
        method: 'POST',
        url: '/comments/' + thisId,
        data: {
            title: $('#titleInput').val(),
            body: $('#bodyInput').val()
        }
    }).then(function (data) {
        console.log(data);
    })
    $("#titleInput").val("");
    $("#bodyInput").val("");
})
