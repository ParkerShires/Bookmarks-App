// eslint-disable-next-line no-unsed-vars

const store = (function() {
    const bookmarks = [];

const addBookmark = function(bookmark) {
    this.bookmarks.unshift(bookmark);
};

const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
};

const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
};

const toggleHiddenDescription = function(id) {
    const bookmark = this.bookmarks.find(bookmark => bookmark.id === id);
    bookmark.hidden = !bookmark.hidden;
};

const toggleNewBookMarkForm = function() {
    this.newBookmarkForm = !this.newBookmarkForm;
};

    return {
        bookmarks,
        addBookmark,
        findById,
        findAndDelete,
        toggleHiddenDescription,
        toggleNewBookMarkForm,
    };

}());