/* global store, $, cuid */

// eslint-disalbe-next-line no-unused-vars
const bookmarks = (function() {
    function generateBookMarkElement(bookmark) {
        // return `<li><span>${}</span></li>`
        let bookmarkTitle = bookmark.name;
        return `
        <li class="bookmark">
            <p class="bookmark-title">${bookmarkTitle}</p>
            <div class="content">                
                <p class="user-rating">Rating: 5 Stars</p>
                <p class="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <div class="bookmark-controls">
                    <button>
                        <span class="button-label">Show description</span>
                    </button>
                    <button>
                       <span class="button-label">Visit site</span>
                    </button>
                    <button>
                        <span class="button-label">Remove bookmark</span>
                    </button>
                </div>
            </div>
        </li>`
    }

    function generateBookMarksString(bookmarks) {
        // generateBookMarkElement();
        const bookmarksArray = bookmarks.map((bookmark) => generateBookMarkElement(bookmark));
        return bookmarksArray.join('');
    }

    function render() {
        let bookmarks = store.bookmarks;

        const bookmarksString = generateBookMarksString(bookmarks);
        $('.js-bookmark-list').html(bookmarksString);
    }

    function handleAddBookMarkClicked() {
        $('#js-bookmarks-form').on('click', '.js-bookmark-adder', event => {
            event.preventDefault();
            console.log('working');
        })
    }

    function handleDropDownClicked() {
        $('#js-bookmarks-form').on('click', '#js-star-rater', event => {
            event.preventDefault();
            console.log('working');
            $('#js-dropdown').toggleClass('show');
        })
    }


    function bindEventListeners() {

        handleAddBookMarkClicked();
        handleDropDownClicked();
        
    }

    
    return {
        bindEventListeners: bindEventListeners,
        render: render,
    };
}());