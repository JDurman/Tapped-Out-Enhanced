packages.never_ending = function() {

    var currentURL = getURL();
    var page = 1;
    var endPageMarker = jQuery('<div/>', {
        id: 'end-page-marker',
        class: 'toe-end-page-marker span6',
        text: 'Scroll To End of Page To Load The Next Page'
    });

    if (getURLWithoutParameters() === Strings.TappedOutCardSearch) {
        $('.pagination').remove();
    } else if (getURLWithoutParameters() === Strings.TappedOutDeckSearch) {
        $('#body .row .btn-group').closest(".row").remove();
    }

    var loadPage = function loadPage(pageNumber, scrollToPage) {
        var newURL = currentURL;
        if (newURL == Strings.TappedOutCardSearch) {
            newURL = newURL + "?name=&mana_cost_converted_0=&mana_cost_converted_1=&rules=&subtype=&formats=&blocks=&rarity=&mana_cost=&o=name&submit=Filter";
        } else if (newURL == Strings.TappedOutDeckSearch) {
            newURL = newURL + "?q=&format=&cards=&o=date_updated&d=desc&general=&price_0=&price_1=&submit=Filter+results";
        }
        newURL = newURL + "&p=" + pageNumber + "&page=" + pageNumber;
        $('#end-page-marker').html('<img src="chrome-extension://' + Strings.AppID + '/img/ajax-loader.gif"/><p>Loading Page...</p>');

        $.get(newURL, function(data) {
            $('#end-page-marker').remove();
            if (getURLWithoutParameters() === Strings.TappedOutCardSearch) {
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

            } else if (getURLWithoutParameters() === Strings.TappedOutDeckSearch) {

                $('#body .container >.row >.span12').append(
                    jQuery('<div/>', {
                        id: 'page-' + pageNumber,
                        class: 'toe-page-marker span12 row',
                        style: 'margin-left: 1px !important',
                        text: 'Page ' + pageNumber
                    })
                );

                var htmlPage = data.match(/<body[^>]*>((.|\n)*)<\/body>/);
                htmlPage = getElementsInHtmlString(htmlPage, "#body .span12 .well:not(:first-child)");
                $('#body .container >.row >.span12').append(htmlPage);
                $('#body .container >.row >.span12').append(endPageMarker);
            }
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

};
