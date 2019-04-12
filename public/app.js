$.getJSON('/articles', function (data) {
    $('.articles').empty()
    for (let i = 0; i < data.length; i++) {
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

$('.refresh').on('click', function (e) {
    e.preventDefault()
    $('.articles').empty()
    $.getJSON('/all', function (data) {
        console.log(data)
    })
    $.getJSON('/articles', function (data) {
        for (let i = 0; i < data.length; i++) {
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
                $('<div>').addClass('modal').attr('id', 'noteModal').append(
                    $('<div>').addClass('noteModal'),
                    $('<span>').addClass('close').text('&times;'),
                    $('<h4>').text(data[i].title)
                )
            ).addClass('articleDiv').attr('data-id', data[i]._id)
            $('.articles').append(displayDiv)
        }
    })
})

$(document).on('click', '.deleteButton', function (e) {
    e.preventDefault();
    let thisId = $(this).attr('data-id');
    $.ajax({
        method: "POST",
        url: "/remove/" + thisId,
    }).then(function (data) {
        console.log(data)
    })
});


