/* global store, $, cuid */

// eslint-disalbe-next-line no-unused-vars
const bookmarks = (function() {

    const getIdFromBookmark = function(bookmark) {
        return $(bookmark).closest('li').data('bookmark-id');
    }

    const generateBookMarkElement = function(bookmark) {
 
        let bookmarkTitle = bookmark.name;
        let bookmarkId = bookmark.id;
        let bookmarkRating = bookmark.rating;
        let bookmarkUrl = bookmark.url;
        let descriptionClass = '';
        let descriptionButtonText = 'Hide';

        if (bookmark.hidden) {
            descriptionClass = 'hidden';
            descriptionButtonText = 'Show';
        }

        return `
        <li class="bookmark" data-bookmark-id="${bookmarkId}">
            <p class="title">${bookmarkTitle}</p>
            <div class="content">                
                <p class="user-rating">Rating: 5 Stars</p>
                <p class="description ${descriptionClass}">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <div class="bookmark-controls">
                    <button>
                        <span class="button-label js-description-button">${descriptionButtonText} description</span>
                    </button>
                    <button><a href = "..." target = "_blank">
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
        // generateBookMarkElement();
        const bookmarksArray = bookmarks.map((bookmark) => generateBookMarkElement(bookmark));
        return bookmarksArray.join('');
    }

    const  render = function(form) {
        // store.newBookmarkForm ? $('.new-bookmark-form').removeClass('hidden'): $('.new-bookmark-form').addClass('hidden');

        let bookmarks = store.bookmarks;

        const bookmarksString = generateBookMarksString(bookmarks);
        $('.js-bookmark-list').html(bookmarksString);

        if (form) {
           $('.add-form').html(generateForm())
        }
    }

    const handleAddBookMarkClicked = function() {
        $('#js-bookmarks-form').on('click', '.js-bookmark-adder', event => {
            event.preventDefault();
            console.log('working');
            render(true);
        })
    }

    // const handleFormSubmit = function() {
    //     $('.js-bookmark-form').on('submit', function (event) {
    //         const bookmarkTitle = $('.title-input').val();
    //         const bookmarkDescription = 
    //     })
    // }

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
        </form>
        `
        
    }

    const handleDropDownClicked = function() {
        $('#js-bookmarks-form, .add-form').on('click', '#js-star-rater, #js-rating-selector', event => {
            event.preventDefault();
            console.log('working');
            // $('#js-dropdown').toggleClass('hidden');
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

        handleAddBookMarkClicked();
        handleDropDownClicked();
        handleDescriptionButtonClicked();
        handleVisitButtonClicked();
        handleRemoveBookmarkButtonClicked();
    }

    // const render = function() {

    // }

    return {
        bindEventListeners: bindEventListeners,
        render: render,
    };
}());