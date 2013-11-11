$(document).on('swipeleft', '[data-role="page"]', function(event){    
    if(event.handled !== true) // This will prevent event triggering more then once
    {    
        var nextpage = $(this).next('[data-role="page"]');
        // swipe using id of next page if exists
        if (nextpage.length > 0) {
            $.mobile.changePage(nextpage, {transition: "slide", reverse: false}, true, true);
        }
        event.handled = true;
    }
    return false;         
});

$(document).on('swiperight', '[data-role="page"]', function(event){   
    if(event.handled !== true) // This will prevent event triggering more then once
    {      
        var prevpage = $(this).prev('[data-role="page"]');
        if (prevpage.length > 0) {
            $.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
        }
        event.handled = true;
    }
    return false;            
});

/*
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
}); */