var packages = {};

$(document).ready(function() {
    if (getURLWithoutParameters() === Strings.TappedOutCardSearch || getURLWithoutParameters() === Strings.TappedOutDeckSearch) {
        packages.never_ending();
    }

});
