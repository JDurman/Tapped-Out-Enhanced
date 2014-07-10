packages.never_ending = function() {

    var currentURL = getURL();
    var page = 1;
    if (getURLWithoutParameters() === Strings.TappedOutSearch) {
        var endPageMarker = jQuery('<div/>', {
            id: 'end-page-marker',
            class: 'toe-end-page-marker span6',
            text: 'Scroll To End of Page To Load The Next Page'
        });

        $('#body h2 .btn-group').closest("h2").remove();

        var loadPage = function loadPage(pageNumber, scrollToPage) {
            var newURL = currentURL + "&p=" + pageNumber + "&page=" + pageNumber;
            $('#end-page-marker').html('<img src="chrome-extension://lnmphhkfjbhjlegomaccninbpjbehhmb/img/ajax-loader.gif"/><p>Loading Page...</p>');

            $.get(newURL, function(data) {
                $('#end-page-marker').remove();
                $('table').parent().append(
                    jQuery('<div/>', {
                        id: 'page-' + pageNumber,
                        class: 'toe-page-marker span6',
                        text: 'Page ' + pageNumber
                    })
                );
                var table = data.match(/<table[^>]*>((.|\n)*)<\/table>/g);
                $('table').parent().append(table);
                $('table').parent().append(endPageMarker);
                pageLoading = false;
                if (pageNumber == page && scrollToPage === true) {
                    var screenPosition = document.getElementById("page-" + page).getBoundingClientRect();
                    $(document).scrollTop(screenPosition.top - 50);
                }
            });
        };

        if (location.hash.match(/#[a-z]+/g) == "#page") {
            page = parseInt(location.hash.split("=")[1]);

            for (var i = 2; i <= page; i++) {
                loadPage(i, true);
            }

        } else {
            $('table').parent().append(endPageMarker);
        }

        $(window).scroll(function() {
            var pageLoading = false;
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                if (pageLoading === false) {
                    pageLoading = true;
                    page++;
                    loadPage(page, false);
                    location.hash = "page=" + page;
                }
            }
        });
    }
};
