'use strict';
/* global $ */

//eslint-disable-next-line no-unused-vars
const api = (function() {

    const BASE_URL = `https://thinkful-list-api.herokuapp.com/parker/bookmarks`;

    const getBookmarks = function(callback) {
        $.getJSON(BASE_URL, callback);
    };

    const createBookmark = function(data, callback) {
        $.ajax({
            url: BASE_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: callback
        });
    };

    const deleteBookmark = (id, callback) => {
        $.ajax({
            url: `${BASE_URL}/${id}`,
            method: 'DELETE',
            contentType: 'application/json',
            data: '',
            success: callback
        });
    };

    return {
        getBookmarks,
        createBookmark,
        deleteBookmark,
    };

}());