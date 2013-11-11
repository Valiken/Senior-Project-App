$(document).delegate("#bookletPageOne", 'pageinit', function (evt) {
    $(this).bind("swipeleft", function (e) {
        $.mobile.changePage("#bookletPageTwo", {
            transition : 'slide'
        });
    });
}).delegate("#bookletPageTwo", 'pageinit', function (evt) {
    $(this).bind("swiperight", function (e) {
        $.mobile.changePage("#bookletPageOne", {
            transition : 'slide',
            reverse    : true
        });
    });
}).delegate("#bookletPageTwo", 'pageinit', function (evt) {
    $(this).bind("swipeleft", function (e) {
        $.mobile.changePage("#bookletPageThree", {
            transition : 'slide'
        });
    });
}).delegate("#bookletPageThree", 'pageinit', function (evt) {
    $(this).bind("swipeleft", function (e) {
        $.mobile.changePage("#bookletPageFour", {
            transition : 'slide'
        });
    });
}).delegate("#bookletPageThree", 'pageinit', function (evt) {
    $(this).bind("swiperight", function (e) {
        $.mobile.changePage("#bookletPageTwo", {
            transition : 'slide',
            reverse    : true
        });
    });
}).delegate("#bookletPageFour", 'pageinit', function (evt) {
    $(this).bind("swipeleft", function (e) {
        $.mobile.changePage("#bookletPageFive", {
            transition : 'slide'
        });
    });
}).delegate("#bookletPageFour", 'pageinit', function (evt) {
    $(this).bind("swiperight", function (e) {
        $.mobile.changePage("#bookletPageThree", {
            transition : 'slide',
            reverse    : true
        });
    });
}).delegate("#bookletPageFive", 'pageinit', function (evt) {
    $(this).bind("swiperight", function (e) {
        $.mobile.changePage("#bookletPageFour", {
            transition : 'slide',
            reverse    : true
        });
    });
});