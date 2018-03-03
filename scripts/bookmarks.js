/* global store, $, cuid */

// eslint-disalbe-next-line no-unused-vars
const bookmarks = (function() {

    const handleGetBookmarks = function() {
        api.getBookmarks((data) => {
            data.reverse().map(bookmark => bookmark.hidden = true);
            store.bookmarks = data;
            render();
        })
    }

    const getIdFromBookmark = function(bookmark) {
        return $(bookmark).closest('li').data('bookmark-id');
    }

    const generateBookMarkElement = function(bookmark) {
 
        let bookmarkTitle = bookmark.title;
        let bookmarkId = bookmark.id;
        let bookmarkRating = bookmark.rating;
        let bookmarkUrl = bookmark.url;
        let bookmarkDescription = bookmark.desc;
        let descriptionClass = '';
        let descriptionButtonText = 'Hide';
        let word = 'Stars';

        if (bookmarkRating == 1) {
            word = 'Star';
        }

        if (!bookmarkRating) {
            bookmarkRating = 0;
        }

        if (bookmark.hidden) {
            descriptionClass = 'hidden';
            descriptionButtonText = 'Show';
        }

        return `
        <li class="bookmark" data-bookmark-id="${bookmarkId}" data-rating= "${bookmarkRating}">
            <p class="title">${bookmarkTitle}</p>
            <div class="content">                
                <p class="user-rating">Rating: ${bookmarkRating} ${word}</p>
                <p class="description ${descriptionClass}">${bookmarkDescription}</p>
                <div class="bookmark-controls">
                    <button>
                        <span class="button-label js-description-button">${descriptionButtonText} description</span>
                    </button>
                    <button><a href = "${bookmarkUrl}" target = "_blank">
                       <span class="button-label js-visit-button">Visit site</span>
                    </a></button>
                    <button>
                        <span class="button-label js-delete-button">Remove bookmark</span>
                    </button>
                </div>
            </div>
        </li>`
    }

    const generateBookMarksString = function(bookmarks) {
        const bookmarksArray = bookmarks.map((bookmark) => generateBookMarkElement(bookmark));
        return bookmarksArray.join('');
    }

    const  render = function(form) {
        let bookmarks = store.bookmarks;

        const bookmarksString = generateBookMarksString(bookmarks);
        $('.js-bookmark-list').html(bookmarksString);

        if (form) {
           $('.add-form').html(generateForm());
        }

        else {
            $('.add-form').html('');
         }
        
    }

    const handleAddBookMarkClicked = function() {
        $('#js-bookmarks-form').on('click', '.js-bookmark-adder', event => {
            event.preventDefault();
            console.log('working');
            render(true);
        })
    }

    const handleFormSubmit = function() {
        $(document).on('click', '.js-bookmark-submitter', function (event) {
            console.log('submitted');
            event.preventDefault();
            const bookmarkTitle = $('.title-input').val();
            const bookmarkRating = $('#js-rating-selector').text();
            const bookmarkDescription = $('.description-input').val();
            const bookmarkUrl = $('.url-input').val();

            const data = {
                title: bookmarkTitle,
                rating: parseInt(bookmarkRating),
                desc: bookmarkDescription,
                url: bookmarkUrl,
                hidden: true,
            }

            api.createBookmark(data, (newBookmark) => {
                console.log(newBookmark);
                store.addBookmark(newBookmark);
                render();
            })
        })
    }

    const handleRatingSelectorDropdown = function() {
        $(document).on('click', 'a', function(event) {
            $('.js-dropdown a').each(function() {
            $(this).attr('data-selected', '') 
            })
            $(event.currentTarget).attr('data-selected', 'chosen')
            $(event.currentTarget).closest('.dropdown-content').prev('.js-dropdown-content').text($(event.currentTarget).text());
            console.log($(event.currentTarget).closest('.dropdown-content').prev('.js-dropdown-content'));

            const minimum = $(event.currentTarget).closest('.dropdown-content').prev('#js-star-rater').text();

            if (minimum) {
                $('.bookmark').each(function() {
                    let rating = $(this).attr('data-rating');
                    if (rating < parseInt(minimum)) {
                        $(this).hide();
                    }
                    else {
                        $(this).show();
                    }
                })
            }
        })
    }

    const generateForm = function() {
        return `
        <form class = "js-bookmark-form>
          <div class = "header">
            <input placeholder = "Title" class = "title-input"/>
            <div class="rating-container">
            <button id="js-rating-selector" class="js-dropdown-content">Select rating</button>
                <div class="dropdown-content hidden js-dropdown">
                    <a href="#">1 Star</a>
                    <a href="#">2 Stars</a>
                    <a href="#">3 Stars</a>
                    <a href="#">4 Stars</a>
                    <a href="#">5 Stars</a>
                </div>
            </div>
           </div>
            <textarea placeholder = "Description" class = "description-input"></textarea>
            <input placeholder = "Url" class = "url-input"/>
            <button class = "js-bookmark-submitter" type = "submit">Submit</button>
        </form>
        `
        
    }

    const handleDropDownClicked = function() {
        $('#js-bookmarks-form, .add-form').on('click', '#js-star-rater, #js-rating-selector', event => {
            event.preventDefault();
            console.log('working');
            $(event.currentTarget).next('.js-dropdown').toggleClass('hidden');
        })
    }

    const handleDescriptionButtonClicked = function() {
        $('.js-bookmark-list').on('click', '.js-description-button', event => {
            console.log('anitiope');
            const id = getIdFromBookmark(event.currentTarget);
            console.log(id);
            store.toggleHiddenDescription(id);
            render();
        })
    }

    const handleVisitButtonClicked = function() {
        $('.js-bookmark-list').on('click', '.js-visit-button', event => {
            console.log('should be working');
        })
    }

    const handleRemoveBookmarkButtonClicked = function() {
        $('.js-bookmark-list').on('click', '.js-delete-button', event => {  
            event.preventDefault();
            console.log('etana');
            const id = getIdFromBookmark(event.currentTarget);
            api.deleteBookmark(id, () => {
                store.findAndDelete(id);
                render();
            })
        })
    }

    const deleteBookmark = function(id) {
        const index = store.bookmarks.findIndex(item => item.id === id);
        store.bookmarks.splice(index, 1);
    }


    function bindEventListeners() {

        handleGetBookmarks();
        handleAddBookMarkClicked();
        handleDropDownClicked();
        handleRatingSelectorDropdown();
        handleDescriptionButtonClicked();
        handleVisitButtonClicked();
        handleRemoveBookmarkButtonClicked();
        handleFormSubmit();
    }

    // const render = function() {

    // }

    return {
        bindEventListeners: bindEventListeners,
        render: render,
    };
}());